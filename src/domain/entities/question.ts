import { Answer, DislikeQuestion, LikeQuestion, Tag, User } from ".";

export class Question {
    id: number;
    author: string;
    title: string;
    description: string;
    rating: number;
    dateOfCreation: Date;
    dateOfUpdate: Date;
    answers: Answer[];
    user: User;
    likes: LikeQuestion[];
    dislikes: DislikeQuestion[];
    tags: Tag[];
}