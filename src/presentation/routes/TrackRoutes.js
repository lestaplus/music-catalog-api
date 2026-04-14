import { Router } from "express";
import { TrackFactory } from "../../domain/factories/TrackFactory.js";
import { PrismaArtistRepository } from "../../infrastructure/repositories/PrismaArtistRepository.js";
import { PrismaTrackRepository } from "../../infrastructure/repositories/PrismaTrackRepository.js";
import { CreateTrackUseCase } from "../../application/use-cases/CreateTrackUseCase.js";
import { GetAllTracksUseCase } from "../../application/use-cases/GetAllTracksUseCase.js";
import { TrackController } from "../controllers/TrackController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

const artistRepository = new PrismaArtistRepository();
const trackRepository = new PrismaTrackRepository();
const trackFactory = new TrackFactory(artistRepository);
const createTrackUseCase = new CreateTrackUseCase(
  trackFactory,
  trackRepository,
);
const getAllTracksUseCase = new GetAllTracksUseCase(trackRepository);
const trackController = new TrackController(
  createTrackUseCase,
  getAllTracksUseCase,
);

router.post("/", authenticateToken, trackController.createTrack);
router.get("/", trackController.getAllTracks);

export default router;
