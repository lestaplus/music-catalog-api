import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
