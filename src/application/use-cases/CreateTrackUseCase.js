export class CreateTrackUseCase {
  constructor(trackFactory, trackRepository) {
    this.trackFactory = trackFactory;
    this.trackRepository = trackRepository;
  }

  async execute(dto) {
    const track = await this.trackFactory.create({
      title: dto.title,
      duration: dto.duration,
      artistId: dto.artistId,
    });

    const savedTrack = await this.trackRepository.save(track);

    return savedTrack;
  }
}
