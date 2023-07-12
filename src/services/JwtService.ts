import { injectable } from "inversify";
import { IJwtService } from "../interfaces/IJwtService";
import jwt from "jsonwebtoken";

@injectable()
export class JwtService implements IJwtService {
  generateToken(data: any, secret: string, expiresIn: string): string {
    const { id, ...withoutId } = data;
    return jwt.sign(
      {
        id: id,
        ...withoutId,
      },
      secret,
      {
        expiresIn,
      }
    );
  }
}
