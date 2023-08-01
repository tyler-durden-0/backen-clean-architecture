import { Question } from "src/domain/entities";
import { IGenericRepository } from "./IGenericRepository";

export interface IQuestionRepository extends IGenericRepository<Question> {
    getQuestionWithAnswersById(id: number): Promise<Question>;
    getQuestionsByTag(tagName: string): Promise<Question[]>;
    getUsersQuestionById(id: number): Promise<Question>;
}