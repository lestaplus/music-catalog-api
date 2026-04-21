import { RegisterUserCommand } from "../../application/commands/RegisterUserCommand.js";
import { LoginUserQuery } from "../../application/queries/LoginUserQuery.js";
import { DomainError } from "../../domain/errors/DomainError.js";

export class AuthController {
  constructor(registerUserCommandHandler, loginUserQueryHandler) {
    this.registerUserCommandHandler = registerUserCommandHandler;
    this.loginUserQueryHandler = loginUserQueryHandler;
  }

  register = async (req, res) => {
    try {
      const command = new RegisterUserCommand(req.body);

      const result = await this.registerUserCommandHandler.execute(command);

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
      const query = new LoginUserQuery(req.body);

      const result = await this.loginUserQueryHandler.execute(query);

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
