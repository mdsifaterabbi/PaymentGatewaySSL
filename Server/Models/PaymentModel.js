import mongoose from "mongoose";

const { Schema } = mongoose;

const PaymentSchema = new Schema(
  {
    sender: String,
    receiver: String,
    amount: Number,
    paymentStatus: { type: Boolean, default: 0 },
    transactionId: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("PaymentModel", PaymentSchema);
