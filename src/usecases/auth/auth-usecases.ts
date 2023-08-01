import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { IJwtService, IJwtServicePayload } from 'src/domain/adapters/jwt.interface';
import { JWTConfig } from 'src/domain/config/jwt.interface';
import { logInDto, refreshDto, registerUserDto } from 'src/domain/dtos/auth';
import { User as UserD } from 'src/domain/entities';
import { CacheRepository, IUserRepository } from 'src/domain/repositories';
import { User } from 'src/infastructure/entities';

@Injectable()
export class AuthUseCases {
  constructor(
    private readonly bcryptService: IBcryptService,
    private readonly userRepository: IUserRepository,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
    private readonly cacheRepository: CacheRepository,
  ) {}

  async registerUser(payload: registerUserDto): Promise<UserD> {
    const userByEmail: UserD | null = await this.userRepository.findOneByEmail(
        payload.email,
      );
      if (!userByEmail) {
        const hashPassword: string = await this.bcryptService.hash(payload.password);
        
        const user: UserD = new UserD();
        user.email = payload.email;
        user.firstName = payload.firstName;
        user.lastName = payload.lastName;
        user.isAdmin = payload.isAdmin;
        user.password = hashPassword;
        user.answers = [];
        user.answers = [];
        user.likesOnAnswers = [];
        user.likesOnQuestions = [];
        user.dislikesOnAnswers = [];
        user.dislikesOnQuestions = [];

        return await this.userRepository.create(user);
      }
      throw new BadRequestException();
  }

  async logIn(payload: logInDto): Promise<object | BadRequestException> {
    const user: UserD | null = await this.userRepository.findOneByEmail(
      payload.email,
    );
    if (user && await this.isPasswordValid(payload.password, user.password)) {
      const payload: IJwtServicePayload = { userId: user.id };

      const secret = this.jwtConfig.getJwtSecret();
      const expiresIn = this.jwtConfig.getJwtExpirationTime();
      const refreshSecret = this.jwtConfig.getJwtRefreshSecret();
      const refreshExpirsIn = this.jwtConfig.getJwtRefreshExpirationTime();
      
      const access_token = this.jwtTokenService.createToken(payload, secret, expiresIn);
      const refresh_token = this.jwtTokenService.createToken(payload, refreshSecret, refreshExpirsIn);

      await this.cacheRepository.set(`access_token:${user.id}`, access_token);
      await this.cacheRepository.set(`refresh_token:${user.id}`, refresh_token);

      return {
        access_token,
        refresh_token,
      };
    }
    throw new BadRequestException();
  }
  
  async logOut(userId: number): Promise<void | BadRequestException> {
    const user: User | undefined = await this.userRepository.get(userId);

    if (user) {
      await this.cacheRepository.del(`access_token:${userId}`)
      await this.cacheRepository.del(`refresh_token:${userId}`)
    } else {
      throw new BadRequestException;
    }

  }

  async refresh(payload: refreshDto): Promise<object | BadRequestException | HttpException> {
    try {
      const refreshSecret = this.jwtConfig.getJwtRefreshSecret();
      const decodedToken = await this.jwtTokenService.checkToken(payload.refresh_token, refreshSecret);
      if (typeof decodedToken === 'object') {
        if (await this.cacheRepository.get(`refresh_token:${decodedToken.userId}`) === payload.refresh_token) {
          //delete old token
          await this.cacheRepository.del(`refresh_token:${decodedToken.userId}`);
  
          //generate new access and refresh tokens
          const payload: IJwtServicePayload = { userId: decodedToken.userId };

          const secret = this.jwtConfig.getJwtSecret();
          const expiresIn = this.jwtConfig.getJwtExpirationTime();
          const refreshSecret = this.jwtConfig.getJwtRefreshSecret();
          const refreshExpirsIn = this.jwtConfig.getJwtRefreshSecret();
          
          const access_token = this.jwtTokenService.createToken(payload, secret, expiresIn);
          const refresh_token = this.jwtTokenService.createToken(payload, refreshSecret, refreshExpirsIn);
      
          //save in Redis
          await this.cacheRepository.set(`access_token:${decodedToken.userId}`, access_token);
          await this.cacheRepository.set(`refresh_token:${decodedToken.userId}`, refresh_token);
  
          return {
            access_token,
            refresh_token,
          };
        } else {
          throw new HttpException('Redirect to the /login', HttpStatus.FOUND, {description: 'Redirect to the /login'})
        }
      }
    } catch(e) {
      if (e.status === 302) {
        throw new HttpException('Redirect to the /login', HttpStatus.FOUND, {description: 'Redirect to the /login'})
      } else {
        throw new BadRequestException;
      }
    }
  }

  async isPasswordValid(
    candidatePassword: string,
    passwordFromDb: string,
  ): Promise<boolean> {
    const passwordEquals = await this.bcryptService.compare(
      candidatePassword,
      passwordFromDb,
    );
    return passwordEquals;
  }
  
}
