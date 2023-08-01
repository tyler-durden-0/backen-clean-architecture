import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infastructure/entities';
import { TypeormUserRepository } from './typeorm/user.repository';
import { TypeOrmConfigModule } from 'src/infastructure/config/typeorm/typeorm.module';
import { RedisConfigModule } from 'src/infastructure/config';
import { RedisRepository } from './redis';

@Module({
  imports: [TypeOrmConfigModule, RedisConfigModule, TypeOrmModule.forFeature([User])],
  providers: [TypeormUserRepository, RedisRepository],
  exports: [TypeormUserRepository, RedisRepository],
})
export class RepositoriesModule {}
