import { Router } from "express";
import { UserFactory } from "../../domain/factories/UserFactory.js";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase.js";
import { AuthTokenService } from "../../infrastructure/services/AuthTokenService.js";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase.js";
import { AuthController } from "../controllers/AuthController.js";

const router = Router();

const userRepository = new PrismaUserRepository();
const authTokenService = new AuthTokenService();
const userFactory = new UserFactory(userRepository);
const registerUserUseCase = new RegisterUserUseCase(
  userFactory,
  userRepository,
);
const loginUserUseCase = new LoginUserUseCase(userRepository, authTokenService);
const authController = new AuthController(
  registerUserUseCase,
  loginUserUseCase,
);

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
