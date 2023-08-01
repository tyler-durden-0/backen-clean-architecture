import { DynamicModule, Module } from '@nestjs/common';

// import { ExceptionsModule } from '../exceptions/exceptions.module';
// import { LoggerModule } from '../logger/logger.module';
// import { LoggerService } from '../logger/logger.service';

// import { BcryptModule } from '../services/bcrypt/bcrypt.module';
// import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
// import { RepositoriesModule } from '../repositories/repositories.module';

// import { DatabaseTodoRepository } from '../repositories/todo.repository';
// import { DatabaseUserRepository } from '../repositories/user.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { RepositoriesModule, TypeormUserRepository } from '../repositories/typeorm';
import { UserUseCases } from 'src/usecases/user';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { AuthUseCases } from 'src/usecases/auth/auth-usecases';
import { BcryptModule } from '../services';
import { RedisRepository } from '../repositories';

// @Module({
//   imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
// })

@Module({
  imports: [ EnvironmentConfigModule, RepositoriesModule, BcryptModule, JwtModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  // Auth
  static AUTH_USECASES_PROXY = 'AuthUseCasesProxy';
  // static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  // static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  static USER_USECASES_PROXY = 'UserUseCasesProxy';

  // static GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
  // static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
  // static POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
  // static DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
  // static PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [BcryptService, TypeormUserRepository, JwtTokenService, EnvironmentConfigService, RedisRepository],
          provide: UsecasesProxyModule.AUTH_USECASES_PROXY,
          useFactory: (
            bcryptService: BcryptService,
            userRepo: TypeormUserRepository,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            cacheRepository: RedisRepository
          ) => new UseCaseProxy(new AuthUseCases(bcryptService, userRepo, jwtTokenService, config, cacheRepository)),
        },
        {
          inject: [TypeormUserRepository],
          provide: UsecasesProxyModule.USER_USECASES_PROXY,
          useFactory: (userRepo: TypeormUserRepository) => new UseCaseProxy(new UserUseCases(userRepo)),
        },
      ],
      exports: [
        UsecasesProxyModule.AUTH_USECASES_PROXY,
        UsecasesProxyModule.USER_USECASES_PROXY,
      ],
    };
  }
}
