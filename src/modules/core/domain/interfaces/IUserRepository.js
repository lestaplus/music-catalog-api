export class IUserRepository {
  async findByEmail(email) {
    throw new Error("findByEmail method must be implemented");
  }

  async save(user) {
    throw new Error("save method must be implemented");
  }
}