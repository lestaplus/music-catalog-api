import { Artist } from "../models/Artist.js";
import { DomainError } from "../errors/DomainError.js";

export class ArtistFactory {
  constructor(artistRepository) {
    this.artistRepository = artistRepository;
  }

  async create({ name, genre, foundedYear }) {
    const newArtist = new Artist({
      id: null,
      name,
      genre,
      foundedYear,
    });

    const existingArtist = await this.artistRepository.findByName(
      newArtist.name,
    );

    if (existingArtist) {
      throw new DomainError(`Artist with name ${name} already exists`);
    }

    return newArtist;
  }
}
