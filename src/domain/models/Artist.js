import { DomainError } from "../errors/DomainError.js";

export class Artist {
  constructor({ id, name, genre, foundedYear }) {
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.foundedYear = foundedYear;
  }

  validate() {
    if (!this.name || this.name.trim() === "") {
      throw new DomainError("Artist name is required");
    }

    if (this.foundedYear != null) {
      const currentYear = new Date().getFullYear();
      if (this.foundedYear > currentYear) {
        throw new DomainError("Founding year cannot be in the future");
      }
    }
  }

  changeGenre(newGenre) {
    if (!newGenre) throw new DomainError("Genre cannot be empty");
    this.genre = newGenre;
  }
}
