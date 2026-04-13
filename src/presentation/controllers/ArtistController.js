import { DomainError } from "../../domain/errors/DomainError.js";

export class ArtistController {
  constructor(createArtistUseCase) {
    this.createArtistUseCase = createArtistUseCase;
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
}
