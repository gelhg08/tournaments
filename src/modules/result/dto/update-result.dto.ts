import { PartialType } from '@nestjs/mapped-types';
import { CreateResultDto } from './create-result.dto';


export class UpdateAuthorDto extends PartialType(CreateResultDto) {}