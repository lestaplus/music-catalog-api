import bcrypt from "bcryptjs";
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

    const newUser = new User({
      id: null,
      email,
      password,
    });

    const existingUser = await this.userRepository.findByEmail(newUser.email);
    if (existingUser) {
      throw new DomainError(`User with email ${newUser.email} already exists`);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    newUser.password = hashedPassword;

    return newUser;
  }
}
