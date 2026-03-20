import express from "express";
import artistRoutes from "./routes/artist.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/artists", artistRoutes);

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
