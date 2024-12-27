require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.route";
import orderRouter from "./routes/order.route";
import paymentRouter from "./routes/payment.route";
import productRouter from "./routes/product.route";


app.use(express.json());
app.use(cookieParser());
app.use(morgan("common"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(
  "/api/v1",
  userRouter,
  orderRouter,
  
  productRouter,
  paymentRouter,
  
);

app.use(
  cors({
    origin: "http://localhost:3000", // Allow this specific origin
    credentials: true, // Enable credentials
  })
);
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    succcess: true,
    message: "API is working",
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});
