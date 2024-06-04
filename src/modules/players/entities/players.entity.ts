import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
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

  @ManyToMany(() => Tournament, (tournament) => tournament.players)
  @JoinTable()
  tournaments: Tournament[];

  @OneToMany(() => Result, (result) => result.winner)
  resultsAsWinner: Result[];

  @OneToMany(() => Result, (result) => result.loser)
  resultsAsLoser: Result[];
}



