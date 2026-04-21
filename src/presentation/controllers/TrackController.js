import { CreateArtistCommand } from "../../application/commands/CreateArtistCommand.js";
import { CreateTrackCommand } from "../../application/commands/CreateTrackCommand.js";
import { GetAllTracksQuery } from "../../application/queries/GetAllTracksQuery.js";
import { DomainError } from "../../domain/errors/DomainError.js";

export class TrackController {
  constructor(createTrackCommandHandler, getAllTracksQueryHandler) {
    this.createTrackCommandHandler = createTrackCommandHandler;
    this.getAllTracksQueryHandler = getAllTracksQueryHandler;
  }

  createTrack = async (req, res) => {
    try {
      const command = new CreateTrackCommand({
        title: req.body.title,
        duration: req.body.duration,
        artistId: req.body.artistId,
      });

      const result = await this.createTrackCommandHandler.execute(command);

      return res.status(201).json(result);
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
      const query = new GetAllTracksQuery();
      const readModel = await this.getAllTracksQueryHandler.execute(query);

      return res.status(200).json(readModel);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
