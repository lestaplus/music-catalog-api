import { Router } from "express";
import { UserFactory } from "../../domain/factories/UserFactory.js";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase.js";
import { AuthController } from "../controllers/AuthController.js";

const router = Router();

const userRepository = new PrismaUserRepository();
const userFactory = new UserFactory(userRepository);
const registerUserUseCase = new RegisterUserUseCase(
  userFactory,
  userRepository,
);
const authController = new AuthController(registerUserUseCase);

router.post("/register", authController.register);

export default router;
