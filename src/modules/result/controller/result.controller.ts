import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ResultService } from '../services/result.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateResultDto } from '../dto/create-result.dto';
import {UpdateResultDto } from '../dto/update-result.dto'
import { Result } from '../entities/result.entity';
import { Query } from '@nestjs/common';

@ApiTags('esports')
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  create(@Body() createResultDto: Result) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.resultService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.resultService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateResultDto: Result) {
    return this.resultService.update(id, updateResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.resultService.remove(id);
  }
}
