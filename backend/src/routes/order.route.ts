import { Router } from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "../controllers/order.controller";

import { verifyToken } from "../middlewares/authMiddleware";
import asyncHandler from "../middlewares/asyncHandler";

const router = Router();

router.post(
  "/",
  verifyToken,
 asyncHandler( createOrder)
);

router.get("/", verifyToken, listOrders);
router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken,  updateOrder);

export default router;
