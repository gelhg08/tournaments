import { Module } from '@nestjs/common';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { PlayersModule } from './modules/players/players.module';
import { ResultsModule } from './modules/result/result.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardsModule } from './modules/rewards/rewards.module';
import { CronService } from './modules/rewards/services/cron.service';
import { RewardsService } from './modules/rewards/services/rewards.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.DB_PORT || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    TournamentsModule,
    PlayersModule,
    ResultsModule,
    RewardsModule,
  ],
  controllers: [],
  providers: [CronService, RewardsService],
})
export class AppModule {}
