import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";

import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

config({ path: "./config/config.env" }); // load env ONLY once

const app = express();

// 🚀 CORS FIXED
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,    // http://localhost:5173
      process.env.DASHBOARD_URL,   // http://localhost:5174
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // REQUIRED for cookies
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File Upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routers
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// DB Connection
dbConnection();

// Error Middleware
app.use(errorMiddleware);

export default app;
