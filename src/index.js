import express from "express";
import artistRoutes from "./presentation/routes/ArtistRoutes.js";
import trackRoutes from "./presentation/routes/TrackRoutes.js";
import authRoutes from "./presentation/routes/AuthRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/tracks", trackRoutes);

app.get("/", (req, res) => {
  res.send("Ok");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
}

export default app;
