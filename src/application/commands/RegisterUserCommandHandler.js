export class RegisterUserCommandHandler {
  constructor(userFactory, userRepository, notificationService) {
    this.userFactory = userFactory;
    this.userRepository = userRepository;
    this.notificationService = notificationService;
  }

  async execute(command) {
    const user = await this.userFactory.create({
      email: command.email,
      password: command.password,
    });

    const savedUser = await this.userRepository.save(user);

    try {
      await this.notificationService.sendWelcomeEmail(
        savedUser.email,
        savedUser.id,
      );
    } catch (error) {
      console.error("Error sending welcome email:", error.message);
    }

    return {
      id: savedUser.id,
      email: savedUser.email,
    };
  }
}
