import PaymentModel from "../Models/PaymentModel.js";
import fs from "fs";

export const greetingsController = (req, res) => {
  try {
    console.log("greetingsController reached");
    res.send({
      success: true,
      message: "Welcome my friend",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error occurred in greetingsController",
    });
  }
};

export const transactionController = async (req, res) => {
  try {
    const { sender, receiver, amount, transactionId, paymentStatus } = req.body;

    //console.log(req.fields);

    //validation
    switch (true) {
      case !sender:
        return res.send({ message: "sender is required" });
      case !receiver:
        return res.send({ message: "receiver is required" });
      case !amount:
        return res.send({ message: "amount is required" });
      case !transactionId:
        return res.send({ message: "transactionId is required" });
    }

    const payment = new PaymentModel({
      sender,
      receiver,
      amount,
      transactionId,
      paymentStatus,
    });

    //console.log(payment);
    await payment.save();

    res.send({
      success: true,
      message: "transactionController is working",
      payment: payment,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "transactionController is not working",
      error,
    });
  }
};

export const getTransactionInfoController = async (req, res) => {
  try {
    const paymentData = await PaymentModel.findOne({
      transactionId: req.params.transactionId,
    });

    res.send({
      success: true,
      message: "getTransactionInfoController is working",
      paymentData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Problem occurren in getTransactionInfoController",
      error,
    });
  }
};

