// Load env FIRST (very important)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// DB & Routes
import connectDB from "./config/db.js";
import Pets from "./routes/petRoutes.js";
import Contact from "./routes/contactRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 5000;

// DB connection
connectDB(process.env.MONGO_DB_URI);

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://pet-adoption-ruby.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Routes
app.use("/api/v1/user", userRoute);
app.use("/contact", Contact);
app.use("/pets", Pets);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
