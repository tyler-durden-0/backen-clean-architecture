import { Answer, DislikeAnswer, DislikeQuestion, LikeAnswer, LikeQuestion, Question } from ".";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    isAdmin: boolean;
    answers: Answer[];
    questions: Question[];
    likesOnQuestions: LikeQuestion[];
    dislikesOnQuestions: DislikeQuestion[];
    likesOnAnswers: LikeAnswer[];
    dislikesOnAnswers: DislikeAnswer[];
}