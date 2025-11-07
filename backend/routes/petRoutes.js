import express from "express";
import { getPets, addPet, deletePet } from "../controllers/petController.js"
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(authMiddleware, getPets).post(authMiddleware, addPet);
router.route("/:name").delete(authMiddleware, deletePet);

export default router;
