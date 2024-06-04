import { IsString, IsEmail, IsArray, IsOptional} from 'class-validator'; 
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

  @IsArray()
  @IsOptional()
  tournaments?: string[];
}
