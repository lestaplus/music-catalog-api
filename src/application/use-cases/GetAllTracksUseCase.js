export class GetAllTracksUseCase {
  constructor(trackRepository) {
    this.trackRepository = trackRepository;
  }

  async execute() {
    return await this.trackRepository.findAll();
  }
}
