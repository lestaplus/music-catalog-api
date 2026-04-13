export class ITrackRepository {
  async save(track) {
    throw new Error("save method must be implemented");
  }
}
