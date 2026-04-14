export class IArtistRepository {
  async findByName(name) {
    throw new Error("findByName method must be implemented");
  }

  async findById(id) {
    throw new Error("findById method must be implemented");
  }

  async save(artist) {
    throw new Error("save method must be implemented");
  }

  async deleteById(id) {
    throw new Error("deleteById method must be implemented");
  }
}
