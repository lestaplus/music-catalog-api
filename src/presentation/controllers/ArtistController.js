import { DomainError } from "../../domain/errors/DomainError.js";

export class ArtistController {
  constructor(createArtistUseCase, deleteArtistUseCase) {
    this.createArtistUseCase = createArtistUseCase;
    this.deleteArtistUseCase = deleteArtistUseCase;
  }

  createArtist = async (req, res) => {
    try {
      const dto = req.body;

      const artist = await this.createArtistUseCase.execute(dto);

      return res.status(201).json(artist);
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
      const { id } = req.params;

      const result = await this.deleteArtistUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(404).json({ error: error.message });
      }

      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
