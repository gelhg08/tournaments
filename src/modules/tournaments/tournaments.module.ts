import { Module } from '@nestjs/common';
import { TournamentsController } from './controller/tournaments.controller';
import { TournamentsService } from './services/tournaments.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament])],
  exports: [TypeOrmModule],
  controllers: [TournamentsController],
  providers: [TournamentsService]
})
export class TournamentsModule {}
