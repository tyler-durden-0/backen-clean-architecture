import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { DislikeAnswer, LikeAnswer, Question, User } from '.';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  text: string;

  @Column({default: 0})
  rating: number;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfCreation: Date;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfUpdate: Date;

  @ManyToOne(() => User, (user) => user.answers)
  user: User

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question

  @OneToMany(() => LikeAnswer, (like) => like.answer)
  likes: LikeAnswer[];

  @OneToMany(() => DislikeAnswer, (like) => like.answer)
  dislikes: DislikeAnswer[];
}