import express from "express";
import {
  createArtist,
  deleteArtist,
} from "../controllers/artist.controller.js";

const router = express.Router();

router.post("/", createArtist);
router.delete("/:id", deleteArtist);

export default router;
