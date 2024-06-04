import { IsString, IsEmail, IsArray, IsOptional} from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ description: 'Players name' })
  @IsString()
  readonly name: string;


  @ApiProperty({ description: 'Players email' })
  @IsString()
  @IsEmail()
  readonly email: string;

}
