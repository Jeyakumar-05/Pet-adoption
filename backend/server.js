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
const allowedOrigins = [
  "http://localhost:5173",
  "https://pet-adoption-ruby.vercel.app"
];
const port = process.env.PORT || 5000;


// DB connection
connectDB(process.env.MONGO_DB_URI);

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed for this origin"));
      }
    },
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

// Serve static files from frontend/dist
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
