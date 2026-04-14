import { IArtistRepository } from "../../domain/interfaces/IArtistRepository.js";
import { ArtistMapper } from "../mappers/ArtistMapper.js";
import prisma from "../../db.js";

export class PrismaArtistRepository extends IArtistRepository {
  async findByName(name) {
    const prismaArtist = await prisma.artist.findFirst({
      where: { name },
    });

    return ArtistMapper.toDomain(prismaArtist);
  }

  async findById(id) {
    const prismaArtist = await prisma.artist.findUnique({
      where: { artist_id: Number(id) },
    });

    return ArtistMapper.toDomain(prismaArtist);
  }

  async save(artist) {
    const data = ArtistMapper.toPersistence(artist);

    const savedPrismaArtist = await prisma.artist.create({ data });

    return ArtistMapper.toDomain(savedPrismaArtist);
  }

  async deleteById(id) {
    await prisma.artist.delete({
      where: { artist_id: Number(id) },
    });
  }
}
