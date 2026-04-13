import { Router } from "express";
import { TrackFactory } from "../../domain/factories/TrackFactory.js";
import { PrismaArtistRepository } from "../../infrastructure/repositories/PrismaArtistRepository.js";
import { PrismaTrackRepository } from "../../infrastructure/repositories/PrismaTrackRepository.js";
import { CreateTrackUseCase } from "../../application/use-cases/CreateTrackUseCase.js";
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
const trackController = new TrackController(createTrackUseCase);

router.post("/", authenticateToken, trackController.createTrack);

export default router;
