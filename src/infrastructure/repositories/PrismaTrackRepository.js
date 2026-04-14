import { ITrackRepository } from "../../domain/interfaces/ITrackRepository.js";
import { TrackMapper } from "../mappers/TrackMapper.js";
import prisma from "../../db.js";

export class PrismaTrackRepository extends ITrackRepository {
  async save(track) {
    const data = TrackMapper.toPersistence(track);

    const savedPrismaTrack = await prisma.track.create({ data });

    return TrackMapper.toDomain(savedPrismaTrack);
  }

  async findAll() {
    const prismaTracks = await prisma.track.findMany();

    return prismaTracks.map((track) => TrackMapper.toDomain(track));
  }
}
