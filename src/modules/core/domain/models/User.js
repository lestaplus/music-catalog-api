import { DomainError } from "../errors/DomainError.js";

export class User {
  constructor({ id, email, password }) {
    this.id = id;
    this.email = email;
    this.password = password;

    this.validate();
  }

  validate() {
    if (!this.email || typeof this.email !== "string") {
      throw new DomainError("User email is required and must be a string");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new DomainError("Incorrect user email format");
    }

    if (!this.password || typeof this.password !== "string") {
      throw new DomainError("User password is required and must be a string");
    }
  }
}
