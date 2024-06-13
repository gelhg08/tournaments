import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import { PaginationDto } from 'src/global/pagination/pagination.dto';
import { Result } from '../entities/result.entity';

@ApiTags('results')
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new result' })
  @ApiResponse({
    status: 201,
    description: 'The result has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get('all')
  async findAll(@Query() paginationDto: PaginationDto): Promise<Result[]> {
    const results = await this.resultService.findAll(paginationDto);
    if (results.length === 0) {
      throw new NotFoundException('No results found');
    }
    return results;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a result by ID' })
  @ApiResponse({ status: 200, description: 'Return the result.' })
  @ApiResponse({ status: 404, description: 'Result not found.' })
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a result' })
  @ApiResponse({
    status: 200,
    description: 'The result has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Result not found.' })
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(+id, updateResultDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a result' })
  @ApiResponse({
    status: 204,
    description: 'The result has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Result not found.' })
  remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}
