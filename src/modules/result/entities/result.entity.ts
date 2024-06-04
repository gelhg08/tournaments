import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import {Player} from '../../players/entities/players.entity';
import { Tournament } from '../../tournaments/entities/tournaments.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.results)
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.resultsAsWinner)
  winner: Player;

  @ManyToOne(() => Player, (player) => player.resultsAsLoser)
  loser: Player;

  @Column()
  winnerScore: number;

  @Column()
  loserScore: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}

