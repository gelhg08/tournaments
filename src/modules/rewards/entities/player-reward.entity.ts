// src/rewards/entities/player-reward.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Player } from '../../players/entities/players.entity';
import { Reward } from './reward.entity';

@Entity()
export class PlayerReward {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.rewards)
  player: Player;

  @ManyToOne(() => Reward)
  reward: Reward;

  @CreateDateColumn()
  assignedAt: Date;
}
