import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';

export class UpdateAuthorDto extends PartialType(CreatePlayerDto) {}