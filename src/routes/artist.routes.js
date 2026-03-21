import express from "express";
import {
  createArtist,
  deleteArtist,
} from "../controllers/artist.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateToken, createArtist);
router.delete("/:id", authenticateToken, deleteArtist);

export default router;
