
import { DislikeQuestion, Question, User } from "src/domain/entities";
import { IGenericRepository } from "./IGenericRepository";

export interface IDislikeQuestionRepository extends IGenericRepository<DislikeQuestion> {
    getDislikeOnQuestion(user: User, question: Question): Promise<DislikeQuestion>;
}