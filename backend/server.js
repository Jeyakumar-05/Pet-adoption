import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load env
dotenv.config();

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB & Routes
import connectDB from "./config/db.js";
import Pets from "./routes/petRoutes.js";
import Contact from "./routes/contactRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://pet-adoption-1-pwx4.onrender.com"
];
const port = process.env.PORT || 5000;


// DB connection
connectDB(process.env.MONGO_DB_URI);

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin static files)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        // Log the blocked origin for debugging
        console.log("Blocked CORS origin:", origin);
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
// Test route removed to allow frontend serving
// app.get("/", (req, res) => {
//   res.send("Welcome to the API");
// });

// Routes
app.use("/api/v1/user", userRoute);
app.use("/contact", Contact);
app.use("/pets", Pets);

// Serve static files from frontend/dist
if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.join(__dirname, "../frontend/dist");

  console.log("Serving static files from:", frontendDistPath);

  app.use(express.static(frontendDistPath));

  app.get("*", (req, res) => {
    const indexPath = path.resolve(__dirname, "../frontend", "dist", "index.html");
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("Error sending index.html:", err);
        res.status(500).send("Error loading frontend application");
      }
    });
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
