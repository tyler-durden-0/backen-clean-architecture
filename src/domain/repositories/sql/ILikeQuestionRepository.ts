import { LikeQuestion, Question, User } from "src/domain/entities";
import { IGenericRepository } from "./IGenericRepository";

export interface ILikeQuestionRepository extends IGenericRepository<LikeQuestion> {
    getLikeOnQuestion(user: User, question: Question): Promise<LikeQuestion>;
}