import express from "express";
import artistRoutes from "./routes/artist.routes.js";
import trackRoutes from "./routes/track.routes.js";
import authRoutes from "./routes/auth.routes.js";

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
