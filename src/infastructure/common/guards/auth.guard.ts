import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Request } from 'express';
import { Role } from '../roles/roles.enum';
import { User } from 'src/infastructure/entities';
import { UsecasesProxyModule } from 'src/infastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infastructure/usecases-proxy/usecases-proxy';
import { UserUseCases } from 'src/usecases/user';
import { JwtTokenService } from 'src/infastructure/services';
import { EnvironmentConfigService } from 'src/infastructure/config';
import { RedisRepository } from 'src/infastructure/repositories';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      // @Inject(CACHE_MANAGER) private cacheManager: Cache,
      private cacheRepository: RedisRepository,
      private readonly jwtService: JwtTokenService,
      private readonly jwtConfig: EnvironmentConfigService,
      @Inject(UsecasesProxyModule.USER_USECASES_PROXY)
      private readonly userUsecasesProxy: UseCaseProxy<UserUseCases>
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const secret = this.jwtConfig.getJwtSecret();
        const payload = await this.jwtService.checkToken(token, secret);
        if (!await this.isUserLogOut(payload.userId)) {
          const userRole: string = (await this.isAdmin(payload.userId)) ? Role.admin : Role.user;
          request['user'] = { ...payload, roles: userRole };
        } else {
          throw new UnauthorizedException();
        }
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  
    private async isAdmin(userId: number) {
      const user: User | null = await this.userUsecasesProxy.getInstance().getUserById(userId);
      return user?.isAdmin;
    }
  
    private async isUserLogOut(userId: number): Promise<boolean> {
      try {
        const access_token = await this.cacheRepository.get(`access_token:${userId}`);
        const refresh_token = await this.cacheRepository.get(`refresh_token:${userId}`);
        return access_token && refresh_token ? false : true;
      } catch {
        return true;
      }
    }
  }