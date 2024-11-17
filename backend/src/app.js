import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Creating App
const app = express();

// Configuring Cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Adding express.json middleware
app.use(express.json({ limit: "16kb" }));

// Adding URLencoded middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Adding Cookie Parser Middleware
app.use(cookieParser());

export { app };
