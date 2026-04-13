import { DomainError } from "../errors/DomainError.js";

export class Track {
  constructor({ id, title, duration, artistId }) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.artistId = artistId;

    this.validate();
  }

  validate() {
    if (
      !this.title ||
      typeof this.title !== "string" ||
      this.title.trim() === ""
    ) {
      throw new DomainError("Track title is required and must be a string");
    }

    if (this.duration !== undefined && this.duration !== null) {
      const durationNum = Number(this.duration);
      if (isNaN(durationNum)) {
        throw new DomainError("Track duration must be a number");
      }
      if (durationNum <= 0) {
        throw new DomainError("Track duration must be greater than 0");
      }
    }

    if (!this.artistId) {
      throw new DomainError("Track must belong to the artist");
    }
  }
}
