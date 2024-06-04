import { Module } from '@nestjs/common';
import { PlayersController } from './controller/players.controller';
import { PlayersService } from './services/players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  exports: [TypeOrmModule],
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule {}
