export interface IJwtService {
  generateToken(data: any, secret: string, expiresIn: string): string;
}
