
import { Answer, DislikeAnswer, User } from "src/domain/entities";
import { IGenericRepository } from "./IGenericRepository";

export interface IDislikeAnswerRepository extends IGenericRepository<DislikeAnswer> {
    getDislikeOnAnswer(user: User, answer: Answer): Promise<DislikeAnswer>;
}