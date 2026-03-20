import prisma from "../db.js";

export const createTrack = async (req, res) => {
  try {
    const { title, duration, artistId } = req.body;

    if (!duration || duration <= 0) {
      return res
        .status(400)
        .json({ error: "Track duration must be greater than 0" });
    }

    const artistExists = await prisma.artist.findUnique({
      where: { artist_id: artistId },
    });

    if (!artistExists) {
      return res.status(404).json({ error: "No artist found with this ID" });
    }

    const newTrack = await prisma.track.create({
      data: {
        title,
        duration,
        artist_id: artistId,
      },
    });

    res.status(201).json(newTrack);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllTracks = async (req, res) => {
  try {
    const tracks = await prisma.track.findMany({
      include: {
        artist: true,
      },
    });

    res.status(200).json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
