import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question, User } from ".";


@Entity()
export class DislikeQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.dislikesOnQuestions)
  user: User;

  @ManyToOne(() => Question, (question) => question.dislikes)
  question: Question;
}