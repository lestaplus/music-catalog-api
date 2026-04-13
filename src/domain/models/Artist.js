import { DomainError } from "../errors/DomainError.js";

export class Artist {
  constructor({ id, name, genre, foundedYear }) {
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.foundedYear = foundedYear;

    this.validate();
  }

  validate() {
    if (
      !this.name ||
      typeof this.name !== "string" ||
      this.name.trim() === ""
    ) {
      throw new DomainError("Artist name is required and must be a string");
    }

    if (this.genre != null && typeof this.genre !== "string") {
      throw new DomainError("Genre must be a string");
    }

    if (this.foundedYear != null) {
      const year = Number(this.foundedYear);

      if (isNaN(year)) {
        throw new DomainError("Founding year must be a number");
      }

      const currentYear = new Date().getFullYear();
      if (year > currentYear) {
        throw new DomainError("Founding year cannot be in the future");
      }
    }
  }

  changeGenre(newGenre) {
    if (!newGenre) throw new DomainError("Genre cannot be empty");
    this.genre = newGenre;
  }
}
