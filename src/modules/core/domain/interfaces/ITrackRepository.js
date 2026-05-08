export class ITrackRepository {
  async save(track) {
    throw new Error("save method must be implemented");
  }

  async findAll() {
    throw new Error("findAll method must be implemented");
  }
}
