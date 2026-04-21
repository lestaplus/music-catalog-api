import prisma from "../../db.js";
import { Track } from "../../domain/models/Track.js";

export class TrackMapper {
  static toDomain(prismaTrack) {
    if (!prismaTrack) return null;

    return new Track({
      id: prismaTrack.track_id,
      title: prismaTrack.title,
      duration: prismaTrack.duration,
      artistId: prismaTrack.artist_id,
    });
  }

  static toPersistence(domainTrack) {
    return {
      title: domainTrack.title,
      duration: domainTrack.duration,
      artist_id: domainTrack.artistId,
    };
  }
}
