import { Module } from '@nestjs/common';
import { RewardsController } from './controller/rewards.controller';
import { RewardsService } from './services/rewards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { PlayerReward } from './entities/player-reward.entity';
import { Player } from '../players/entities/players.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reward, PlayerReward, Player]),
    ScheduleModule.forRoot(),
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}
