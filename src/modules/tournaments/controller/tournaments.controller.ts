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
  Query,
  UseGuards,
} from '@nestjs/common';
import { TournamentsService } from '../services/tournaments.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Tournament } from '../entities/tournaments.entity';
import { ApiKeyGuard } from 'src/global/guard/api-key.guards';

@Controller('tournaments')
@UseGuards(ApiKeyGuard)
export class TournamentsController {
  constructor(private readonly tournamentService: TournamentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an tournament' })
  @ApiResponse({
    status: 201,
    description: 'The tournament has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createTournamentDto: Tournament) {
    return this.tournamentService.create(createTournamentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all tournaments' })
  @ApiResponse({ status: 200, description: 'Return all tournaments.' })
  @ApiResponse({ status: 404, description: 'No tournament found.' })
  findAll(@Query('page') page: number, @Query('limit') limit: number){
    return this.tournamentService.findAll(page, limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an tournament by ID' })
  @ApiResponse({ status: 200, description: 'Return the tournament.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  findOne(@Param('id') id: number) {
    return this.tournamentService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an tournament' })
  @ApiResponse({ status: 200, description: 'The tournament has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'tournament not found.' })
  update(@Param('id') id: number, @Body() updateTournamentDto: Tournament) {
    return this.tournamentService.update(id, updateTournamentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an tournament' })
  @ApiResponse({ status: 204, description: 'The tournament has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  remove(@Param('id') id: number) {
    return this.tournamentService.remove(id);
  }
}
