import { DomainError } from "../../domain/errors/DomainError.js";

export class DeleteArtistUseCase {
  constructor(artistRepository) {
    this.artistRepository = artistRepository;
  }

  async execute(id) {
    const existingArtist = await this.artistRepository.findById(id);

    if (!existingArtist) {
      throw new DomainError(`Artist with ID ${id} not found`);
    }

    await this.artistRepository.deleteById(id);

    return { message: `Artist with ID ${id} successfully deleted` };
  }
}
