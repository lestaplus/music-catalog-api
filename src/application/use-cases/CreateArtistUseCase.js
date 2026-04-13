export class CreateArtistUseCase {
  constructor(artistFactory, artistRepository) {
    this.artistFactory = artistFactory;
    this.artistRepository = artistRepository;
  }

  async execute(dto) {
    const artist = await this.artistFactory.create({
      name: dto.name,
      genre: dto.genre,
      foundedYear: dto.foundedYear,
    });

    const savedArtist = await this.artistRepository.save(artist);

    return savedArtist;
  }
}
