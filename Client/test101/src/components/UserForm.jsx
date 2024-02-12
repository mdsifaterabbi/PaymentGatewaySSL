import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMyContext } from "../ContextAPI/ContextAPI";
import { Link } from "react-router-dom";

const UserForm = () => {
  const [result, setResult] = useMyContext();
  const [nextPage, setNextPage] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mySubmitData = async (data) => {
    function generateTransactionId() {
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 7); // 5 random characters
      return `TR${timestamp}-${randomSuffix}`; // Example: "TR1667704546954-5e5z2f"
    }

    //================ sending data to post request=================
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL_PREFIX}/transaction`,
      {
        sender: data.sender,
        receiver: data.receiver,
        amount: data.amount,
        transactionId: generateTransactionId(),
        paymentStatus: 0,
      }
    );
    if (response?.data?.success) {
      setResult(response?.data);
      if (!response?.data?.payment?.paymentStatus) {
        toast.error("Payment Pending");
      }
      setNextPage(1);
    }
  };

  const showNotification = () => {
    if (!result?.payment?.paymentStatus) {
      console.log("From API-paymentStatus:", result?.payment?.paymentStatus);
      console.log("From API-sender:", result?.payment?.sender);
      console.log("From API-receiver:", result?.payment?.receiver);
      console.log("From API-amount:", result?.payment?.amount);
      console.log("From API-transactionId:", result?.payment?.transactionId);
    }
  };

  useEffect(() => {
    //console.log("After update:", result);
    showNotification();
  }, [result]);

  return (
    <div className="flex flex-row h-[100vh] justify-center items-center">
      <div className="basis-1/1 sm:basis-1/3 py-[30px]">
        <form
          onSubmit={handleSubmit(mySubmitData)}
          className="text-center mx-auto py-[30px] bg-sky-500 w-[95%] sm:w-[400px] md:w-[500px]"
        >
          <h1 className="text-center text-white font-extrabold">
            Payment Form
          </h1>
          <input
            {...register("sender", { required: true })}
            placeholder="sender"
            className="block my-[10px] text-center mx-auto w-[95%] sm:w-[280px] md:w-[300px]"
          />
          {errors.sender && <p>Last name is required.</p>}

          <input
            {...register("receiver", { required: true })}
            placeholder="receiver"
            className="block my-[10px] text-center mx-auto w-[95%] sm:w-[280px] md:w-[300px]"
          />
          {errors.receiver && <p>Last name is required.</p>}

          <input
            {...register("amount", { required: true })}
            placeholder="amount"
            type="number"
            className="block my-[10px] text-center mx-auto w-[95%] sm:w-[280px] md:w-[300px]"
          />
          {errors.amount && <p>Please enter amount in number format</p>}

          {!nextPage ? (
            <button type="submit" className="btn btn-success btn-sm mt-[25px]">
              Start Payment
            </button>
          ) : (
            <Link to="/confirm-payment">
              <button
                type="submit"
                className="btn btn-success btn-sm mt-[25px]"
              >
                Proceed to Payment
              </button>
            </Link>
          )}

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default UserForm;
