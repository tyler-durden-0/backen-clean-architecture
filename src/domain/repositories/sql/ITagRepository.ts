import { Tag } from "src/domain/entities";
import { IGenericRepository } from "./IGenericRepository";

export interface ITagRepository extends IGenericRepository<Tag> {
    findTagByName(name: string): Promise<Tag> ;
}