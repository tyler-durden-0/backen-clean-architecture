import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer, User } from ".";

@Entity()
export class DislikeAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.dislikesOnAnswers)
  user: User;

  @ManyToOne(() => Answer, (answer) => answer.dislikes)
  answer: Answer;
}