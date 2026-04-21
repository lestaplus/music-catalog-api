import request from "supertest";
import app from "../../src/index.js";
import prisma from "../../src/db.js";
import { beforeEach, jest } from "@jest/globals";

describe("Integration: GET /api/tracks", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("Should return list of tracks bypassing Domain", async () => {
    jest.spyOn(prisma.track, "findMany").mockResolvedValue([
      {
        track_id: 101,
        title: "Track Title",
        duration: 204,
        artist: { name: "Artist Name" },
      },
    ]);

    const response = await request(app).get("/api/tracks");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toEqual({
      id: 101,
      title: "Track Title",
      duration: 204,
      artistName: "Artist Name",
    });

    expect(prisma.track.findMany).toHaveBeenCalledTimes(1);
  });
});
