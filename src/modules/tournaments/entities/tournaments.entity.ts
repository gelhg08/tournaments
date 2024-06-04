import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { Player } from '../../players/entities/players.entity';
import { Result } from '../../result/entities/result.entity';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Player)
  @JoinTable()
  players: Player[];

  @OneToMany(() => Result, (result) => result.tournament)
  results: Result[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
