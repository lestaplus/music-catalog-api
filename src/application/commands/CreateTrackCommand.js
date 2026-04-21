export class CreateTrackCommand {
  constructor({ title, duration, artistId }) {
    this.title = title;
    this.duration = duration;
    this.artistId = artistId;
  }
}
