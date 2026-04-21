import { CreateArtistCommand } from "../../src/application/commands/CreateArtistCommand.js";
import { CreateArtistCommandHandler } from "../../src/application/commands/CreateArtistCommandHandler.js";
import { jest } from "@jest/globals";

describe("Unit: CreateArtistCommandHandler", () => {
  test("Should successfully process command and return ID", async () => {
    const mockArtist = {
      id: 1,
      name: "Artist Name",
      genre: "Electronic",
      foundedYear: 1995,
    };
    const mockFactory = {
      create: jest.fn().mockResolvedValue(mockArtist),
    };
    const mockRepository = {
      save: jest.fn().mockResolvedValue(mockArtist),
    };

    const handler = new CreateArtistCommandHandler(mockFactory, mockRepository);
    const command = new CreateArtistCommand({
      name: "Artist Name",
      genre: "Electronic",
      foundedYear: 1995,
    });

    const result = await handler.execute(command);

    expect(result).toEqual({ id: 1 });
    expect(mockFactory.create).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledWith(mockArtist);
  });
});
