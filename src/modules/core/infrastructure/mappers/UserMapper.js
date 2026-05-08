import { User } from "../../domain/models/User.js";

export class UserMapper {
  static toDomain(prismaUser) {
    if (!prismaUser) return null;

    return new User({
      id: prismaUser.user_id,
      email: prismaUser.email,
      password: prismaUser.password,
    });
  }

  static toPersistence(domainUser) {
    return {
      email: domainUser.email,
      password: domainUser.password,
    };
  }
}
