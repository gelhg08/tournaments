import { Module } from '@nestjs/common';
import { ResultService } from './services/result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Tournament } from '../tournaments/entities/tournaments.entity';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, Tournament]),
    PlayersModule, // Importa PlayersModule para que PlayerRepository esté disponible
  ],
  providers: [ResultService],
  exports: [ResultService],
})
export class ResultsModule {}
