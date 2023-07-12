import { RefreshToken, User } from "@prisma/client";

export interface IUserRepository {
  getUserByUserName(userName: string): Promise<User | null>;

  saveRefreshToken(userId: number, token: string): Promise<RefreshToken>;
}
