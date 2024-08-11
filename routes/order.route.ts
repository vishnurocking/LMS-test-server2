import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder,
  createRazorpayOrder,
  getAllOrders,
  sendRazorpayKey,
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);

orderRouter.get(
  "/get-orders",
  isAutheticated,
  authorizeRoles("admin"),
  getAllOrders
);

orderRouter.get("/razorpay-key", sendRazorpayKey);
orderRouter.post("/create-razorpay-order", isAutheticated, createRazorpayOrder);

export default orderRouter;
