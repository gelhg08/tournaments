import { Module } from '@nestjs/common';
import { PlayersController } from './controller/players.controller';
import { PlayersService } from './services/players.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  exports: [TypeOrmModule],
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule {}
