import express from "express";
import { createTrack, getAllTracks } from "../controllers/track.controller.js";

const router = express.Router();

router.post("/", createTrack);
router.get("/", getAllTracks);

export default router;
