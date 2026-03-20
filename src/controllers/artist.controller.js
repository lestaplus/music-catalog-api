import prisma from "../db.js";

export const createArtist = async (req, res) => {
  try {
    const { name, genre, founded_year } = req.body;

    const currentYear = new Date().getFullYear();
    if (founded_year && founded_year > currentYear) {
      return res
        .status(400)
        .json({ error: "The founding year cannot be in the future" });
    }

    const newArtist = await prisma.artist.create({
      data: {
        name,
        genre,
        founded_year,
      },
    });

    res.status(201).json(newArtist);
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "Artist with this name already exists" });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const artistId = parseInt(req.params.id);

    await prisma.artist.delete({
      where: { artist_id: artistId },
    });

    res.status(200).json({ message: "Artist deleted" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "No artist found with this ID" });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
