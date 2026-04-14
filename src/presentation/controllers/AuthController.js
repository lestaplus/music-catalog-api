import { DomainError } from "../../domain/errors/DomainError.js";

export class AuthController {
  constructor(registerUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
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

      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
