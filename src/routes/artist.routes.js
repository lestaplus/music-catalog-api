import express from "express";
import { createArtist } from "../controllers/artist.controller.js";

const router = express.Router();

router.post("/", createArtist);

export default router;
