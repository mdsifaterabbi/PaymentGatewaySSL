import express from "express";
import {
  getTransactionInfoController,
  greetingsController,
  transactionController,
} from "../controllers/myControllers.js";
const router = express.Router();

router.get("/", greetingsController);
router.post("/transaction", transactionController);
router.post("/transaction/:transactionId", getTransactionInfoController);

export default router;
