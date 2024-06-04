import { Module } from '@nestjs/common';
import { PlayersController } from './controller/players.controller';
import { PlayersService } from './services/players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/players.entity';
import { Tournament } from '../tournaments/entities/tournaments.entity';
import { Result } from '../result/entities/result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    TypeOrmModule.forFeature([Tournament]),
    TypeOrmModule.forFeature([Result]),
  ],
  exports: [TypeOrmModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
