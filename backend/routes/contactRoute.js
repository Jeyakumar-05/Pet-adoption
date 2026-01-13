import express from "express";
import {
  getContactRequests,
  submitContactForm,
} from "../controllers/contactController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(submitContactForm);
router.route("/").get(authMiddleware, adminMiddleware, getContactRequests);

export default router;
