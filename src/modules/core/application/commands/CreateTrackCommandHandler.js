export class CreateTrackCommandHandler {
  constructor(trackFactory, trackRepository) {
    this.trackFactory = trackFactory;
    this.trackRepository = trackRepository;
  }

  async execute(command) {
    const track = await this.trackFactory.create({
      title: command.title,
      duration: command.duration,
      artistId: command.artistId,
    });

    const savedTrack = await this.trackRepository.save(track);

    return { id: savedTrack.id };
  }
}
