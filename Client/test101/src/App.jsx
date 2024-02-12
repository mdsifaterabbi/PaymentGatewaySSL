import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import ConfirmPayment from "./Pages/ConfirmPayment";
import SuccessPayment from "./Pages/SuccessPayment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/confirm-payment" element={<ConfirmPayment />} />
        <Route path="/success-payment/:tr_id" element={<SuccessPayment />} />
      </Routes>
    </>
  );
}

export default App;
