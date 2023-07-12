import { DoLoginService } from "../types/Auth";

export interface IAuthenticationService {
  doLogin(userName: string, password: string): Promise<DoLoginService>;
}
