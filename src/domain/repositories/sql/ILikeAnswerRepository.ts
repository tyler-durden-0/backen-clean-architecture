
import { Answer, LikeAnswer, User } from "src/domain/entities";
import { IGenericRepository } from "./IGenericRepository";

export interface ILikeAnswerRepository extends IGenericRepository<LikeAnswer> {
    getLikeOnAnswer(user: User, answer: Answer): Promise<LikeAnswer>;
}