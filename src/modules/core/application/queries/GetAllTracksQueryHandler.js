import prisma from "../../../../db.js";

export class GetAllTracksQueryHandler {
  async execute(query) {
    const tracks = await prisma.track.findMany({
      include: {
        artist: true,
      },
    });

    return tracks.map((track) => ({
      id: track.track_id,
      title: track.title,
      duration: track.duration,
      artistName: track.artist?.name || "Unknown artist",
    }));
  }
}
