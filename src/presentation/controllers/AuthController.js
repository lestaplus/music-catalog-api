import { DomainError } from "../../domain/errors/DomainError.js";

export class AuthController {
  constructor(registerUserUseCase, loginUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
  }

  register = async (req, res) => {
    try {
      const dto = {
        email: req.body.email,
        password: req.body.password,
      };

      const result = await this.registerUserUseCase.execute(dto);

      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }

      console.error("Register error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  login = async (req, res) => {
    try {
      const dto = {
        email: req.body.email,
        password: req.body.password,
      };

      const result = await this.loginUserUseCase.execute(dto);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(401).json({ error: error.message });
      }

      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
