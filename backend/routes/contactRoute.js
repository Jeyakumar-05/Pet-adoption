import express from "express";
import {
  getContactRequests,
  submitContactForm,
  acceptContactRequest,
  rejectContactRequest,
} from "../controllers/contactController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(submitContactForm);
router.route("/").get(authMiddleware, adminMiddleware, getContactRequests);
router
  .route("/:contactId/accept")
  .post(authMiddleware, adminMiddleware, acceptContactRequest);
router
  .route("/:contactId/reject")
  .post(authMiddleware, adminMiddleware, rejectContactRequest);

export default router;
