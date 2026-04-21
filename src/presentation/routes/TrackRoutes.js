import { Router } from "express";
import { TrackFactory } from "../../domain/factories/TrackFactory.js";
import { PrismaArtistRepository } from "../../infrastructure/repositories/PrismaArtistRepository.js";
import { PrismaTrackRepository } from "../../infrastructure/repositories/PrismaTrackRepository.js";
import { CreateTrackCommandHandler } from "../../application/commands/CreateTrackCommandHandler.js";
import { GetAllTracksQueryHandler } from "../../application/queries/GetAllTracksQueryHandler.js";
import { TrackController } from "../controllers/TrackController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

const artistRepository = new PrismaArtistRepository();
const trackRepository = new PrismaTrackRepository();
const trackFactory = new TrackFactory(artistRepository);
const createTrackCommandHandler = new CreateTrackCommandHandler(
  trackFactory,
  trackRepository,
);
const getAllTracksQueryHandler = new GetAllTracksQueryHandler();
const trackController = new TrackController(
  createTrackCommandHandler,
  getAllTracksQueryHandler,
);

router.post("/", authenticateToken, trackController.createTrack);
router.get("/", trackController.getAllTracks);

export default router;
