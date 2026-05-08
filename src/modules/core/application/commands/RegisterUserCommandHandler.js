import { UserRegisteredEvent } from "../../domain/events/UserRegisteredEvent.js";

export class RegisterUserCommandHandler {
  constructor(userFactory, userRepository, eventBus) {
    this.userFactory = userFactory;
    this.userRepository = userRepository;
    this.eventBus = eventBus;
  }

  async execute(command) {
    const user = await this.userFactory.create({
      email: command.email,
      password: command.password,
    });

    const savedUser = await this.userRepository.save(user);

    const event = new UserRegisteredEvent({
      userId: savedUser.id,
      email: savedUser.email,
    });
    this.eventBus.publish(event);

    return {
      id: savedUser.id,
      email: savedUser.email,
    };
  }
}
