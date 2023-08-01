import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question, User } from ".";


@Entity()
export class LikeQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likesOnQuestions)
  user: User;

  @ManyToOne(() => Question, (question) => question.likes)
  question: Question;
}