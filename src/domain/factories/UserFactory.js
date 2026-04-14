import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { DomainError } from "../errors/DomainError.js";

export class UserFactory {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create({ email, password }) {
    if (!password || password.length < 8) {
      throw new DomainError("User password must contain at least 8 characters");
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new DomainError(`User with email ${email} already exists`);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return new User({
      id: null,
      email,
      password: hashedPassword,
    });
  }
}
