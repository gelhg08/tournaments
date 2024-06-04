import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateResultDto {
  @IsNotEmpty()
  @IsNumber()
  tournamentId: number;

  @IsNotEmpty()
  @IsNumber()
  winnerId: number;

  @IsNotEmpty()
  @IsNumber()
  loserId: number;

  @IsNotEmpty()
  @IsNumber()
  winnerScore: number;

  @IsNotEmpty()
  @IsNumber()
  loserScore: number;
}
