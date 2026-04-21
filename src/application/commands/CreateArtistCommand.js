export class CreateArtistCommand {
  constructor({ name, genre, foundedYear }) {
    this.name = name;
    this.genre = genre;
    this.foundedYear = foundedYear;
  }
}
