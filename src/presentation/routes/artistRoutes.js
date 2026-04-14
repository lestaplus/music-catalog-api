import { Router } from "express";
import { ArtistFactory } from "../../domain/factories/ArtistFactory.js";
import { PrismaArtistRepository } from "../../infrastructure/repositories/PrismaArtistRepository.js";
import { CreateArtistUseCase } from "../../application/use-cases/CreateArtistUseCase.js";
import { DeleteArtistUseCase } from "../../application/use-cases/DeleteArtistUseCase.js";
import { ArtistController } from "../controllers/ArtistController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

const artistRepository = new PrismaArtistRepository();
const artistFactory = new ArtistFactory(artistRepository);
const createArtistUseCase = new CreateArtistUseCase(
  artistFactory,
  artistRepository,
);
const deleteArtistUseCase = new DeleteArtistUseCase(artistRepository);
const artistController = new ArtistController(
  createArtistUseCase,
  deleteArtistUseCase,
);

router.post("/", authenticateToken, artistController.createArtist);
router.delete("/:id", authenticateToken, artistController.deleteArtist);

export default router;
