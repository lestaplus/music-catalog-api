import { Router } from "express";
import { ArtistFactory } from "../../domain/factories/ArtistFactory.js";
import { PrismaArtistRepository } from "../../infrastructure/repositories/PrismaArtistRepository.js";
import { CreateArtistCommandHandler } from "../../application/commands/CreateArtistCommandHandler.js";
import { DeleteArtistCommandHandler } from "../../application/commands/DeleteArtistCommandHandler.js";
import { ArtistController } from "../controllers/ArtistController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

const artistRepository = new PrismaArtistRepository();
const artistFactory = new ArtistFactory(artistRepository);
const createArtistCommandHandler = new CreateArtistCommandHandler(
  artistFactory,
  artistRepository,
);
const deleteArtistCommandHandler = new DeleteArtistCommandHandler(
  artistRepository,
);
const artistController = new ArtistController(
  createArtistCommandHandler,
  deleteArtistCommandHandler,
);

router.post("/", authenticateToken, artistController.createArtist);
router.delete("/:id", authenticateToken, artistController.deleteArtist);

export default router;
