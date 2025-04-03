import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user-repository";

export class UpdateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<User> {
    const updatedUser = await this.userRepository.update(user);
    return updatedUser;
  }
}
