export interface IJwtServicePayload {
    userId: number;
}
  
export interface IJwtService {
    checkToken(token: string, secret?: string): Promise<any>;
    createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string;
}
  