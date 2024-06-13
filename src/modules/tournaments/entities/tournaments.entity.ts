import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Player } from '../../players/entities/players.entity';
import { Result } from '../../result/entities/result.entity';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Player, (player) => player.tournaments)
  @JoinTable()
  players: Player[];

  @OneToMany(() => Result, (result) => result.tournament)
  results: Result[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
