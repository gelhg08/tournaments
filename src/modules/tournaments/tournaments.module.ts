import { Module } from '@nestjs/common';
import { TournamentsController } from './controller/tournaments.controller';
import { TournamentService } from '../tournaments/services/tournaments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournaments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament])],
  exports: [TypeOrmModule],
  controllers: [TournamentsController],
  providers: [TournamentService]
})
export class TournamentsModule {}
