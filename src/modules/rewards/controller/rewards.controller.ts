import { Controller, Post, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { RewardsService } from '../services/rewards.service';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardService: RewardsService) {}

  @Post('claim/:playerId')
  @HttpCode(HttpStatus.OK)
  async claimReward(@Param('playerId') playerId: number) {
    return this.rewardService.assignRewardToPlayer(playerId);
  }
}
