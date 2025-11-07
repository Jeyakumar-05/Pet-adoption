import express from "express";
import { createUser, loginUser, logoutUser } from "../controllers/userController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);
router.route("/auth").post(loginUser);
router.route("/logout").post(authMiddleware, logoutUser)

export default router;