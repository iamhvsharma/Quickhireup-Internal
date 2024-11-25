import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/companyprofile.routes.js";


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

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

export { app };
