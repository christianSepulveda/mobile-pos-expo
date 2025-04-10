import { DomainError } from "../../domain/entities/error";
import { Login, User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user-repository";
import { makePostRequest } from "../api";

export class UserService implements UserRepository {
  async find(data: Login): Promise<User | DomainError> {
    const response = (await makePostRequest("/user/login", data)) as any;
    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const user = response.data as User;
    return user;
  }

  async update(data: User): Promise<User> {
    const response = await makePostRequest("/user/update", data);
    if (!response || response.status !== 200) {
      return {} as User;
    }

    const user = response.data as User;

    return user;
  }
}
