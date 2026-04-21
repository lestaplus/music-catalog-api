export class RegisterUserCommandHandler {
  constructor(userFactory, userRepository) {
    this.userFactory = userFactory;
    this.userRepository = userRepository;
  }

  async execute(command) {
    const user = await this.userFactory.create({
      email: command.email,
      password: command.password,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
    };
  }
}
