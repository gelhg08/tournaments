import { Module } from '@nestjs/common';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PlayersModule } from './players/players.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [TournamentsModule, PlayersModule, ResultModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
