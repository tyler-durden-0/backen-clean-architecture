import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infastructure/usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { RedisRepository, RepositoriesModule } from 'src/infastructure/repositories';
import { EnvironmentConfigModule, RedisConfigModule } from 'src/infastructure/config';
import { JwtModule as JwtServiceModule } from '../infastructure/services';
import { QuestionController } from './question/question.controller';

@Module({
  imports: [UsecasesProxyModule.register(), RedisConfigModule, JwtServiceModule, EnvironmentConfigModule],
  providers: [RedisRepository],
  controllers: [AuthController, QuestionController],
})
export class ControllersModule {}