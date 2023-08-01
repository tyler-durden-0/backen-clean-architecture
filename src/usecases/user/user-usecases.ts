import { Injectable } from '@nestjs/common';
import { User as UserD } from 'src/domain/entities';
import { TypeormUserRepository } from 'src/infastructure/repositories/typeorm';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly userRepository: TypeormUserRepository,
  ) {}

  async getUserById(id: number): Promise<UserD> {
    return this.userRepository.get(id);
  }

  async createUser(user: UserD): Promise<UserD> {
    try {
      const createdUser = await this.userRepository.create(user);

      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: number, user: UserD): Promise<boolean> {
    return this.userRepository.update(userId, user);
  }
}
