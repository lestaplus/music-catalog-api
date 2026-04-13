import { Artist } from "../../domain/models/Artist.js";

export class ArtistMapper {
  static toDomain(prismaArtist) {
    if (!prismaArtist) return null;

    return new Artist({
      id: prismaArtist.id,
      name: prismaArtist.name,
      genre: prismaArtist.genre,
      foundedYear: prismaArtist.founded_year,
    });
  }

  static toPersistence(domainArtist) {
    return {
      name: domainArtist.name,
      genre: domainArtist.genre,
      founded_year: domainArtist.foundedYear,
    };
  }
}
