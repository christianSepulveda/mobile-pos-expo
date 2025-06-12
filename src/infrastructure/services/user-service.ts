import AsyncStorage from "@react-native-async-storage/async-storage";
import { DomainError } from "../../domain/entities/error";
import { Login, User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user-repository";
import { makePostRequest } from "../api";

export class UserService implements UserRepository {
  async find(payload: Login): Promise<User | DomainError> {
    const response = (await makePostRequest("/user/login", payload)) as any;
    const data = response.data;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const authToken = `Bearer ${data.authorization.authToken}`;
    const refreshToken = data.authorization.refreshToken;

    await AsyncStorage.setItem("authToken", authToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);

    const user = data.user as User;
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
