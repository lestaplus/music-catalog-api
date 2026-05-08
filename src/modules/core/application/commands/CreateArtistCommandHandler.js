export class CreateArtistCommandHandler {
  constructor(artistFactory, artistRepository) {
    this.artistFactory = artistFactory;
    this.artistRepository = artistRepository;
  }

  async execute(command) {
    const artist = await this.artistFactory.create({
      name: command.name,
      genre: command.genre,
      foundedYear: command.foundedYear,
    });

    const savedArtist = await this.artistRepository.save(artist);

    return { id: savedArtist.id };
  }
}
