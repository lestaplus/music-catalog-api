import { DomainError } from "../../domain/errors/DomainError.js";

export class TrackController {
  constructor(createTrackUseCase, getAllTracksUseCase) {
    this.createTrackUseCase = createTrackUseCase;
    this.getAllTracksUseCase = getAllTracksUseCase;
  }

  createTrack = async (req, res) => {
    try {
      const dto = req.body;

      const track = await this.createTrackUseCase.execute(dto);

      return res.status(201).json(track);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }

      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getAllTracks = async (req, res) => {
    try {
      const tracks = await this.getAllTracksUseCase.execute();
      return res.status(200).json(tracks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
