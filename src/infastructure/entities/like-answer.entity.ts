import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer, User } from ".";

@Entity()
export class LikeAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likesOnAnswers)
  user: User;

  @ManyToOne(() => Answer, (answer) => answer.likes)
  answer: Answer;
}