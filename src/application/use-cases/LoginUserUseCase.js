import bcrypt from "bcryptjs";
import { DomainError } from "../../domain/errors/DomainError.js";

export class LoginUserUseCase {
  constructor(userRepository, authTokenService) {
    this.userRepository = userRepository;
    this.authTokenService = authTokenService;
  }

  async execute(dto) {
    if (
      !dto.email ||
      typeof dto.email !== "string" ||
      !dto.password ||
      typeof dto.password !== "string"
    ) {
      throw new DomainError("Incorrect email or password");
    }

    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new DomainError("Incorrect email or password");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new DomainError("Incorrect email or password");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = this.authTokenService.generate(payload);

    return {
      token,
      user: payload,
    };
  }
}
