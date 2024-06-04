import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty({ description: 'Tournament name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Tournament description ' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
