import { RefreshToken, User } from "@prisma/client";
import { UpdateUserByIdRepo } from "../types/User";

export interface IUserRepository {
  getUserByUserName(userName: string): Promise<User | null>;

  saveRefreshToken(userId: number, token: string): Promise<RefreshToken>;

  getUserById(id: number): Promise<User | null>;

  updateUserById(id: number, userData: UpdateUserByIdRepo): Promise<User>;
}
