import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Reward } from '../entities/reward.entity';
import { PlayerReward } from '../entities/player-reward.entity';
import { Player } from 'src/modules/players/entities/players.entity';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(PlayerReward)
    private playerRewardRepository: Repository<PlayerReward>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async getRandomReward(): Promise<Reward> {
    const rewards = await this.rewardRepository.find({
      where: { quantity: MoreThan(0) },
    });
    if (rewards.length === 0)
      throw new NotFoundException('No rewards available');
    const randomIndex = Math.floor(Math.random() * rewards.length);
    return rewards[randomIndex];
  }

  async assignRewardToPlayer(playerId: number): Promise<PlayerReward> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
    });
    if (!player) throw new NotFoundException('Player not found');

    const reward = await this.getRandomReward();
    reward.quantity -= 1;
    await this.rewardRepository.save(reward);

    const playerReward = this.playerRewardRepository.create({ player, reward });
    return this.playerRewardRepository.save(playerReward);
  }

  async autoAssignRewards() {
    const players = await this.playerRepository.find();
    for (const player of players) {
      await this.assignRewardToPlayer(player.id);
    }
  }
}
