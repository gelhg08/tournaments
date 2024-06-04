import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournaments.entity';
import { Player } from '../../players/entities/players.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.results)
  tournament: Tournament;

  @ManyToOne(() => Player)
  winner: Player;

  @ManyToOne(() => Player)
  loser: Player;

  @ManyToOne(() => Player, (player) => player.results)
  player: Player;

  @Column()
  winnerScore: number;

  @Column()
  loserScore: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
