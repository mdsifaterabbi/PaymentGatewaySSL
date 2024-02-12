import { useEffect, useState } from "react";
import { useMyContext } from "../ContextAPI/ContextAPI";
import axios from "axios";
import { Link } from "react-router-dom";
const { Date } = window;

const ConfirmPayment = () => {
  const [result, setResult] = useMyContext();
  const [getTransactionInfo, setTransactionInfo] = useState();

  const [createdAtDateFormat, setCreatedAtDateFormat] = useState();
  const [createdAtTimeFormat, setCreatedAtTimeFormat] = useState();

  ///transaction/:id

  const getTransactionData = async (req, res) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_PREFIX}/transaction/${
          result?.payment?.transactionId
        }`
      );
      if (res?.data?.success) {
        setTransactionInfo(res?.data?.paymentData);
        const createdAtDate = new Date(res?.data?.paymentData?.createdAt);
        const formattedDate = createdAtDate.toLocaleDateString();
        const formattedTime = createdAtDate.toLocaleTimeString();
        setCreatedAtDateFormat(formattedDate);
        setCreatedAtTimeFormat(formattedTime);
      }
    } catch (error) {}
  };

  const payment = async (req, res) => {
    //get tran_id here
    const tid = result?.payment?.transactionId;

    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL_ROOT}/ssl-request/${tid}`
    );
    if (data?.success) {
      console.log(data?.url);
      window.location.replace(data?.url);
    } else {
      console.log("Error occurred in payment function in react try block");
    }
  };

  useEffect(() => {
    console.log(result);
    getTransactionData();
  }, [result]);

  return (
    <>
      {/* For medium to upper devices starts from here */}
      <div className="flex flex-col flex-wrap">
        <div className="basis-1/1 bg-slate-600 text-white hidden md:block">
          <h1>Confirm Your payment</h1>
        </div>
        <div className="basis-1/1 hidden md:block">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>transactionId</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>{result?.payment?.transactionId}</th>
                  <td>{result?.payment?.sender}</td>
                  <td>{result?.payment?.receiver}</td>
                  <td>{result?.payment?.amount}</td>
                  <td>
                    {createdAtDateFormat}
                    <br></br>
                    {createdAtTimeFormat}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* For extra small and small devices */}
      <div className="flex flex-col flex-wrap md:hidden">
        <div className="basis-1/1">
          <h1 className="text-xl text-slate-500 font-bold text-center py-[50px]">
            Confirm Your payment
          </h1>
        </div>
        <div className="basis-1/1 md:hidden pl-[10px] pr-[0px]">
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Tr Id:
            </span>
            {result?.payment?.transactionId}
          </p>
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Sender:
            </span>
            {result?.payment?.sender}
          </p>
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Receiver:
            </span>
            {result?.payment?.receiver}
          </p>
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Amount:
            </span>
            {result?.payment?.amount}
          </p>
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Date:
            </span>
            {createdAtDateFormat}
            &nbsp;-&nbsp;
            {createdAtTimeFormat}
          </p>
        </div>
      </div>
      <div className="text-center">
        <button
          className="btn btn-sm btn-outline mt-[50px]"
          onClick={() => payment()}
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
};

export default ConfirmPayment;
