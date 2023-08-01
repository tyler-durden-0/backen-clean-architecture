import { User } from "src/domain/entities";
import { IGenericRepository } from "./IGenericRepository";

export interface IUserRepository extends IGenericRepository<User> {
    findOneByEmail(email: string): Promise<User>;
}