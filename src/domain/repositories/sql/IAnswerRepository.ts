import { Answer } from "../../entities";
import { IGenericRepository } from "./IGenericRepository";

export interface IAnswerRepository extends IGenericRepository<Answer> {
    getUsersAnswerById(answerId: number): Promise<Answer>;
}