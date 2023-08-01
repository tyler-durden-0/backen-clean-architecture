    import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { DeleteResult, UpdateResult, Repository } from 'typeorm';
    import  {User as UserD}  from '../../../domain/entities/user';
    import {User} from '../../entities/user.entity';
    import { IUserRepository } from 'src/domain/repositories';

    @Injectable()
    export class TypeormUserRepository implements IUserRepository {
        constructor(
            @InjectRepository(User)
            private readonly userEntityRepository: Repository<User>,
        ) {}

        async getAll(): Promise<UserD[]> {
            const userEntities: User[] = await this.userEntityRepository.find();
            return userEntities.map((userEntity) => this.toUserD(userEntity));
        }

        async get(id: number): Promise<UserD> {
            const userEntity: User = await this.userEntityRepository.findOneBy({id});
            return this.toUserD(userEntity);
        }

        async create(item: UserD): Promise<UserD> {
            const userEntity: User = this.toUserEntity(item);
            // const newUserEntity: User = this.userEntityRepository.create({
            //     ...item,
            // });
        
            const savedUserEntity: User = await this.userEntityRepository.save(userEntity);
        
            return savedUserEntity;
        }

        async update(id:number, item: UserD): Promise<boolean> {
            const userEntity: User = this.toUserEntity(item);
            const updattedAnswer: UpdateResult = await this.userEntityRepository.update(id, userEntity);
            return updattedAnswer.affected > 0;
        }

        async remove(id: number): Promise<boolean> {
            const deleteResult: DeleteResult = await this.userEntityRepository.delete(id);
            return deleteResult.affected > 0;
        }

        async findOneByEmail(email: string): Promise<UserD> {
            const userEntity: User = await this.userEntityRepository.findOneBy({email});
            return userEntity? this.toUserD(userEntity) : null;
        }

        private toUserD(userEntity: User): UserD {
            const userD: UserD = new UserD();

            userD.id = userEntity.id;
            userD.firstName = userEntity.firstName;
            userD.lastName = userEntity.lastName;
            userD.password = userEntity.password;
            userD.email = userEntity.email;
            userD.isAdmin = userEntity.isAdmin;
            userD.answers = userEntity.answers;
            userD.questions = userEntity.questions;
            userD.likesOnQuestions = userEntity.likesOnQuestions;
            userD.dislikesOnQuestions = userEntity.dislikesOnQuestions;
            userD.dislikesOnAnswers = userEntity.dislikesOnAnswers;

            return userD;
        }

        private toUserEntity(userD: UserD): User {
            const userEntity: User = new User();

            userEntity.id = userD.id;
            userEntity.firstName = userD.firstName;
            userEntity.lastName = userD.lastName;
            userEntity.password = userD.password;
            userEntity.email = userD.email;
            userEntity.isAdmin = userD.isAdmin;
            userEntity.answers = userD.answers;
            userEntity.questions = userD.questions;
            userEntity.likesOnQuestions = userD.likesOnQuestions;
            userEntity.dislikesOnQuestions = userD.dislikesOnQuestions;
            userEntity.dislikesOnAnswers = userD.dislikesOnAnswers;

            return userEntity;
        }
    }