import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentDto } from './create-tournament.dto';


export class UpdateAuthorDto extends PartialType(CreateTournamentDto) {}