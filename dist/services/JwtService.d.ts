import { IJwtService } from "../interfaces/IJwtService";
export declare class JwtService implements IJwtService {
    generateToken(data: any, secret: string, expiresIn: string): string;
}
