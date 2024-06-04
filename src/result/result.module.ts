import { Module } from '@nestjs/common';
import { ResultController } from './controller/result.controller';
import { ResultService } from './services/result.service';

@Module({
  controllers: [ResultController],
  providers: [ResultService]
})
export class ResultModule {}
