import { Module } from '@nestjs/common';
import { ResultController } from './controller/result.controller';
import { ResultService } from './services/result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result])],
  exports: [TypeOrmModule],
  controllers: [ResultController],
  providers: [ResultService]
})
export class ResultModule {}
