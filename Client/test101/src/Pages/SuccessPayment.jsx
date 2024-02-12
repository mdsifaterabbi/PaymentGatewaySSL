import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const { Date } = window;

const SuccessPayment = () => {
  // Get the data from URL parameters or state
  const { tr_id } = useParams();
  const [fetchData, setFetchData] = useState({});
  const [createdAtDateFormat, setCreatedAtDateFormat] = useState();
  const [createdAtTimeFormat, setCreatedAtTimeFormat] = useState();

  const fetchCurrentInfo = async (req, res) => {
    try {
      const myResponse = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_PREFIX}/transaction/${tr_id}`
      );
      setFetchData(myResponse?.data?.paymentData);
      const createdAtDate = new Date(myResponse?.data?.paymentData?.createdAt);
      const formattedDate = createdAtDate.toLocaleDateString();
      const formattedTime = createdAtDate.toLocaleTimeString();
      setCreatedAtDateFormat(formattedDate);
      setCreatedAtTimeFormat(formattedTime);
    } catch (error) {
      console.log("Error occurred in fetchCurrentInfo in SuccessPayment.jsx");
    }
  };

  useEffect(() => {
    fetchCurrentInfo();
  }, []);

  return (
    <>
      {/* For medium to upper devices starts from here */}
      <div className="flex flex-col flex-wrap">
        <div className="basis-1/1 bg-slate-600 text-white hidden md:block">
          <h1>Success Payment Page</h1>
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
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>{fetchData?.transactionId}</th>
                  <td>{fetchData?.sender}</td>
                  <td>{fetchData?.receiver}</td>
                  <td>{fetchData?.amount}</td>
                  <td>
                    {createdAtDateFormat}
                    <br></br>
                    {createdAtTimeFormat}
                  </td>
                  <td>
                    {!fetchData?.paymentStatus ? (
                      <span className="badge badge-md badge-warning">
                        Not Paid
                      </span>
                    ) : (
                      <span className="badge badge-md badge-success">Paid</span>
                    )}
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
            Success Payment Page
          </h1>
        </div>
        <div className="basis-1/1 md:hidden pl-[10px] pr-[0px]">
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Tr Id:
            </span>
            {fetchData?.transactionId}
          </p>
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Sender:
            </span>
            {fetchData?.sender}
          </p>
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Receiver:
            </span>
            {fetchData?.receiver}
          </p>
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Amount:
            </span>
            {fetchData?.amount}
          </p>
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Date:
            </span>
            {createdAtDateFormat}
            &nbsp;-&nbsp;
            {createdAtTimeFormat}
          </p>
          <p>
            <span className="badge badge-sm badge-info rounded-none mr-[5px]">
              Payment Status:
            </span>
            {!fetchData?.paymentStatus ? (
              <span className="badge badge-sm badge-warning">Not Paid</span>
            ) : (
              <span className="badge badge-sm badge-success">Paid</span>
            )}
          </p>
        </div>
      </div>
      <Link to="/">
        <button className="btn btn-sm btn-outline mt-[50px] mx-[50px]">
          Home
        </button>
      </Link>
    </>
  );
};

export default SuccessPayment;
