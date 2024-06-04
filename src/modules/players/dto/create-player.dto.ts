import { IsString, IsEmail} from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ description: 'Players name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Players age' })
  @IsString()
  age: string;

  @ApiProperty({ description: 'Players email' })
  @IsString()
  @IsEmail()
  email: string;
}
