import bcrypt from "bcryptjs";
import prisma from "../../../../db.js";
import { DomainError } from "../../domain/errors/DomainError.js";

export class LoginUserQueryHandler {
  constructor(authTokenService) {
    this.authTokenService = authTokenService;
  }

  async execute(query) {
    if (
      !query.email ||
      typeof query.email !== "string" ||
      !query.password ||
      typeof query.password !== "string"
    ) {
      throw new DomainError("Incorrect email or password");
    }

    const user = await prisma.user.findUnique({
      where: { email: query.email },
    });

    if (!user) {
      throw new DomainError("Incorrect email or password");
    }

    const isPasswordValid = await bcrypt.compare(query.password, user.password);

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
