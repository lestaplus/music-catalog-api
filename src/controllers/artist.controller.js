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
