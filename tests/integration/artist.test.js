import request from "supertest";
import app from "../../src/index.js";
import prisma from "../../src/db.js";
import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";

const testToken = jwt.sign(
  { id: 1, email: "test@example.com" },
  process.env.JWT_SECRET || "secret-key",
);

describe("Integration: POST /api/artists", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("Should return status code 201 and create artist if data is valid", async () => {
    jest.spyOn(prisma.artist, "findFirst").mockResolvedValue(null);
    jest.spyOn(prisma.artist, "create").mockResolvedValue({
      id: 1,
      name: "Artist Name",
      genre: "Electronic",
      founded_year: 2005,
    });

    const response = await request(app)
      .post("/api/artists")
      .set("Authorization", `Bearer ${testToken}`)
      .send({ name: "Artist Name", genre: "Electronic", foundedYear: 2005 });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Artist Name");
    expect(prisma.artist.create).toHaveBeenCalledTimes(1);
  });

  test("Should return status code 400 if artist name is empty", async () => {
    const createSpy = jest.spyOn(prisma.artist, "create");

    const response = await request(app)
      .post("/api/artists")
      .set("Authorization", `Bearer ${testToken}`)
      .send({ name: "", genre: "Pop", foundedYear: 2012 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(createSpy).not.toHaveBeenCalled();
  });
});
