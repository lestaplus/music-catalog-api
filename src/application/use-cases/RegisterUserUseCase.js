export class RegisterUserUseCase {
  constructor(userFactory, userRepository) {
    this.userFactory = userFactory;
    this.userRepository = userRepository;
  }

  async execute(dto) {
    const user = await this.userFactory.create({
      email: dto.email,
      password: dto.password,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
    };
  }
}
