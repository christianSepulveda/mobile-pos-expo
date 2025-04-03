import { DomainError } from "../../../domain/entities/error";
import { Login } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user-repository";

export class FindUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(login: Login): Promise<Login | DomainError> {
    const findedUser = await this.userRepository.find(login);
    return findedUser;
  }
}
