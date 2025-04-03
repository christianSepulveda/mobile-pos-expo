import { DomainError } from "../entities/error";
import { Login, User } from "../entities/user";

export type UserRepository = {
  update: (user: User) => Promise<User>;
  find: (data: Login) => Promise<User | DomainError>;
};
