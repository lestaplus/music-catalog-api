import { IUserRepository } from "../../domain/interfaces/IUserRepository.js";
import { UserMapper } from "../mappers/UserMapper.js";
import prisma from "../../../../db.js";

export class PrismaUserRepository extends IUserRepository {
  async findByEmail(email) {
    const prismaUser = await prisma.user.findUnique({
      where: { email },
    });

    return UserMapper.toDomain(prismaUser);
  }

  async save(user) {
    const data = UserMapper.toPersistence(user);

    const savedPrismaUser = await prisma.user.create({ data });

    return UserMapper.toDomain(savedPrismaUser);
  }
}
