import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Answer, DislikeAnswer, DislikeQuestion, LikeAnswer, LikeQuestion, Question } from '.';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  isAdmin: boolean;

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[]

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[]

  @OneToMany(() => LikeQuestion, (like) => like.user)
  likesOnQuestions: LikeQuestion[];

  @OneToMany(() => DislikeQuestion, (like) => like.user)
  dislikesOnQuestions: DislikeQuestion[];

  @OneToMany(() => LikeAnswer, (like) => like.user)
  likesOnAnswers: LikeAnswer[];

  @OneToMany(() => DislikeAnswer, (like) => like.user)
  dislikesOnAnswers: DislikeAnswer[];
}