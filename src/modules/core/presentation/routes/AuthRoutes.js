import { Router } from "express";
import { UserFactory } from "../../domain/factories/UserFactory.js";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";
import { RegisterUserCommandHandler } from "../../application/commands/RegisterUserCommandHandler.js";
import { AuthTokenService } from "../../infrastructure/services/AuthTokenService.js";
import { LoginUserQueryHandler } from "../../application/queries/LoginUserQueryHandler.js";
import { AuthController } from "../controllers/AuthController.js";

export default function createAuthRoutes(eventBus) {
  const router = Router();

  const userRepository = new PrismaUserRepository();
  const authTokenService = new AuthTokenService();
  const userFactory = new UserFactory(userRepository);

  const registerUserCommandHandler = new RegisterUserCommandHandler(
    userFactory,
    userRepository,
    eventBus,
  );
  const loginUserQueryHandler = new LoginUserQueryHandler(authTokenService);
  const authController = new AuthController(
    registerUserCommandHandler,
    loginUserQueryHandler,
  );

  router.post("/register", authController.register);
  router.post("/login", authController.login);

  return router;
}
