import express from "express";
import { getPets, addPet, deletePet } from "../controllers/petController.js"

const router = express.Router();

router.route("/").get(getPets).post(addPet);
router.route("/:name").delete(deletePet);

export default router;
