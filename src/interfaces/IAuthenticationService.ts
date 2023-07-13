import { User } from "@prisma/client";
import { DoLoginService } from "../types/Auth";

export interface IAuthenticationService {
  doLogin(userName: string, password: string): Promise<DoLoginService>;

  changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Promise<User>;
}
