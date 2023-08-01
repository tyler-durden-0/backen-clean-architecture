import { DislikeAnswer, LikeAnswer, Question, User } from ".";

export class Answer {
    id: number;
    author: string;
    text: string;
    rating: number;
    dateOfCreation: Date;
    dateOfUpdate: Date;
    user: User;
    question: Question;
    likes: LikeAnswer[];
    dislikes: DislikeAnswer[];
}