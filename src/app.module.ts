import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsecasesProxyModule } from './infastructure/usecases-proxy/usecases-proxy.module';
import { BcryptModule } from './infastructure/services/bcrypt/bcrypt.module';
import { EnvironmentConfigModule } from './infastructure/config';
import { JwtModule as JwtServiceModule } from './infastructure/services';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.secret,
    }),
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
    EnvironmentConfigModule,
  ],
})
export class AppModule {}
