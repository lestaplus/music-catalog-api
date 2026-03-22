import express from "express";
import { createTrack, getAllTracks } from "../controllers/track.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateToken, createTrack);
router.get("/", getAllTracks);

export default router;
