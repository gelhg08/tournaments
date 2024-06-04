import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  DeleteDateColumn,
  OneToMany,
  CreateDateColumn, 
  UpdateDateColumn,
} from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournaments.entity';
import { Result } from '../../result/entities/result.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @ManyToMany(() => Tournament, (tournament) => tournament.players)
  tournaments: Tournament[];

  @OneToMany(() => Result, (result) => result.player)
  results: Result[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
