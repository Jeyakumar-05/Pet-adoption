import express from "express";
import { getPets, addPet, deletePet, searchPets, updatePetStatus } from "../controllers/petController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(authMiddleware, getPets).post(authMiddleware, addPet);
router.route("/search").get(authMiddleware, searchPets);
router.route("/:name").delete(authMiddleware, deletePet);
router.route("/:id/status").put(authMiddleware, updatePetStatus);

export default router;
