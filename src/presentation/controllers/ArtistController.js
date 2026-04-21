import { CreateArtistCommand } from "../../application/commands/CreateArtistCommand.js";
import { DeleteArtistCommand } from "../../application/commands/DeleteArtistCommand.js";
import { DomainError } from "../../domain/errors/DomainError.js";

export class ArtistController {
  constructor(createArtistCommandHandler, deleteArtistCommandHandler) {
    this.createArtistCommandHandler = createArtistCommandHandler;
    this.deleteArtistCommandHandler = deleteArtistCommandHandler;
  }

  createArtist = async (req, res) => {
    try {
      const command = new CreateArtistCommand({
        name: req.body.name,
        genre: req.body.genre,
        foundedYear: req.body.foundedYear,
      });

      const result = await this.createArtistCommandHandler.execute(command);

      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }

      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  deleteArtist = async (req, res) => {
    try {
      const command = new DeleteArtistCommand(req.params.id);

      await this.deleteArtistCommandHandler.execute(command);
      return res.status(200).json({ message: "Artist has been removed" });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(404).json({ error: error.message });
      }

      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
