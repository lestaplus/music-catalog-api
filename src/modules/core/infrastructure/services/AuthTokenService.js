import jwt from "jsonwebtoken";

export class AuthTokenService {
  constructor() {
    this.secret = process.env.JWT_SECRET || "secret-key";
  }

  generate(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }
}
