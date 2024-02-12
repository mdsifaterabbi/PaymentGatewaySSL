import express from "express";
import bodyParser from "body-parser";
const app = express();
import SSLCommerzPayment from "sslcommerz-lts";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/myRoute.js";
import mongoose from "mongoose";
import connectDB from "./Connection/MongodbConnection.js";
import PaymentModel from "./Models/PaymentModel.js";

//configure dotenv
dotenv.config();

//database connection
connectDB();

const PORT = process.env.PORT || 3030;

//some middlewares
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//routes
app.use("/api/v1", router);

//routes for ssl commerze
app.post("/ssl-request/:tid", async (req, res, next) => {
  const { tid } = req.params;

  const myData = await PaymentModel.findOne({ transactionId: tid });

  const data = {
    total_amount: myData?.amount,
    currency: "BDT",
    tran_id: tid, // use unique tran_id for each api call
    success_url: "http://localhost:3000/ssl-request-success",
    fail_url: "http://localhost:3000/ssl-request-failure",
    cancel_url: "http://localhost:3000/ssl-request-cancel",
    ipn_url: "http://localhost:3000/ssl-request-ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: myData?.sender,
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: myData?.receiver,
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(
    process.env.SSL_STORE_ID,
    process.env.SSL_STORE_PASSWORD,
    false
  );
  sslcz.init(data).then((data) => {
    //console.log("My Data: ", data); //i will get every response here
    //console.log("My Data Status: ", data?.status);
    //console.log("My GatewayPageURL: ", data?.GatewayPageURL);
    // if (data?.GatewayPageURL) {
    //   return res.status(200).redirect(data?.GatewayPageURL);
    // } else {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Error occurren in ssl-commerze session",
    //   });
    // }

    if (data?.status) {
      return res.send({
        success: true,
        url: data?.GatewayPageURL,
        data: data,
      });
    } else {
      return res.send({
        success: false,
        message: "Error occurren in ssl-commerze session",
      });
    }
  });
});

// app.post("/ssl-request-success", async (req, res, next) => {
//   return res.status(200).json({
//     data: req.body,
//   });
// });

app.post("/ssl-request-success", async (req, res, next) => {
  const tr_id = req.body.tran_id;
  const reactRoute = `http://localhost:8080/success-payment/${tr_id}`; // Replace with your desired route
  const dataFromBody = req.body.tran_id; // Replace with the specific data you need

  // Construct the redirect URL with query parameters
  const redirectUrl = `${reactRoute}?data=${dataFromBody}`;

  //update payment status
  await PaymentModel.findOneAndUpdate(
    { transactionId: tr_id },
    {
      $set: {
        paymentStatus: 1,
      },
    },
    {
      new: true,
    }
  );

  return res.redirect(redirectUrl);

});

app.post("/ssl-request-failure", async (req, res, next) => {
  return res.status(400).json({
    data: req.body,
  });
});

app.post("/ssl-request-cancel", async (req, res, next) => {
  return res.status(200).json({
    data: req.body,
  });
});

app.post("/ssl-request-ipn", async (req, res, next) => {
  return res.status(200).json({
    data: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Sifat Server app listening on port ${PORT}`);
});
