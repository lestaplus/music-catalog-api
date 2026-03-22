import request from "supertest";
import app from "../src/index.js";
import jwt from "jsonwebtoken";
import prisma from "../src/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";
const testToken = jwt.sign({ userId: 1 }, JWT_SECRET, { expiresIn: "1h" });

describe("Track API Tests", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Should return status code 400 if track duration <= 0", async () => {
    const invalidTrack = {
      title: "Test Song",
      duration: -5,
      artistId: 1,
    };

    const response = await request(app)
      .post("/api/tracks")
      .set("Authorization", `Bearer ${testToken}`)
      .send(invalidTrack);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Track duration must be greater than 0");
  });

  test("Should return status code 401 if token is missing", async () => {
    const validTrack = {
      title: "Test Song",
      duration: 120,
      artistId: 1,
    };

    const response = await request(app).post("/api/tracks").send(validTrack);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Token is missing");
  });

  test("Should return status code 200 and and array of tracks on GET", async () => {
    const response = await request(app).get("/api/tracks");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
