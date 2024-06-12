import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';
import { RewardsService } from './rewards.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly rewardService: RewardsService) {
    this.scheduleDailyRewardAssignment();
  }

  scheduleDailyRewardAssignment() {
    cron.schedule(
      '59 23 * * *',
      async () => {
        this.logger.debug('Running daily reward assignment');
        await this.rewardService.autoAssignRewards();
        this.logger.debug('Daily reward assignment completed');
      },
      {
        timezone: 'America/Bogota',
      },
    );
  }
}
