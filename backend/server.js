// // Package import

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// utils import

import connectDB from "./config/db.js";
import Pets from "./routes/petRoutes.js";
import Contact from "./routes/contactRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

// initialize the port

const port = process.env.PORT || 5000;

// DB conection

connectDB(process.env.MONGO_DB_URI);

const app = express();

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

app.get("/", (req, res) => {
  res.send("Welcome to the  api");
});

app.use("/api/v1/user", userRoute);
app.use("/contact", Contact);
app.use("/pets", Pets);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
