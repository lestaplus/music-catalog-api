import { DomainError } from "../../domain/errors/DomainError.js";

export class DeleteArtistCommandHandler {
  constructor(artistRepository) {
    this.artistRepository = artistRepository;
  }

  async execute(command) {
    const existingArtist = await this.artistRepository.findById(command.id);

    if (!existingArtist) {
      throw new DomainError(`Artist with ID ${command.id} not found`);
    }

    await this.artistRepository.deleteById(command.id);

    return { id: command.id };
  }
}
