import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Answer, DislikeQuestion, LikeQuestion, Tag, User } from '.';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column({default: ''})
  description: string;

  @Column({default: 0})
  rating: number;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfCreation: Date;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfUpdate: Date;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[]
  
  @ManyToOne(() => User, (user) => user.questions)
  user: User

  @OneToMany(() => LikeQuestion, (like) => like.question)
  likes: LikeQuestion[];

  @OneToMany(() => DislikeQuestion, (like) => like.question)
  dislikes: DislikeQuestion[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[]
}