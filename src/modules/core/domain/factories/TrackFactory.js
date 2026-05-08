import { Track } from "../models/Track.js";
import { DomainError } from "../errors/DomainError.js";

export class TrackFactory {
  constructor(artistRepository) {
    this.artistRepository = artistRepository;
  }

  async create({ title, duration, artistId }) {
    const newTrack = new Track({
      id: null,
      title,
      duration,
      artistId,
    });

    const existingArtist = await this.artistRepository.findById(
      newTrack.artistId,
    );

    if (!existingArtist) {
      throw new DomainError(
        `Artist with ID ${newTrack.artistId} not found. Unable to create track`,
      );
    }

    return newTrack;
  }
}
