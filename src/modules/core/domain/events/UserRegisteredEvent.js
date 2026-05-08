export class UserRegisteredEvent {
  constructor({ userId, email }) {
    this.userId = userId;
    this.email = email;
    this.happenedAt = new Date();

    Object.freeze(this);
  }
}
