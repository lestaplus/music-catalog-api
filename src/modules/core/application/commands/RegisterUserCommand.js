export class RegisterUserCommand {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}
