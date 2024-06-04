import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { TournamentService } from '../../tournaments/services/tournaments.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import {UpdateTournamentDto } from '../dto/update-tournament.dto';
import { Query } from '@nestjs/common';
import { PaginationDto } from 'src/global/pagination/pagination.dto';
import { Tournament } from '../entities/tournaments.entity';

@ApiTags('tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentService: TournamentService) {}

    @Post('new')
  @HttpCode(HttpStatus.CREATED)@Post('new')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an tournament' })
  @ApiResponse({
    status: 201,
    description: 'The tournament has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.create(createTournamentDto);
  }

  @Get('all')
  async findAll(@Query() paginationDto: PaginationDto): Promise<Tournament[]> {
    const tournaments = await this.tournamentService.findAll(paginationDto);
    if (tournaments.length === 0) {
      throw new NotFoundException('No tournaments found');
    }
    return tournaments;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an tournament by ID' })
  @ApiResponse({ status: 200, description: 'Return the tournament.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  findOne(@Param('id') id: number) {
    return this.tournamentService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an tournament' })
  @ApiResponse({
    status: 200,
    description: 'The tournament has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentService.update(+id, updateTournamentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an tournament' })
  @ApiResponse({ status: 204, description: 'The tournament has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  remove(@Param('id') id: number) {
    return this.tournamentService.remove(id);
  }

  @Post(':id/players/:playerId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add a player to a tournament' })
  @ApiResponse({ status: 200, description: 'Player added to the tournament.' })
  @ApiResponse({ status: 404, description: 'Tournament or player not found.' })
  addPlayer(@Param('id') tournamentId: string, @Param('playerId') playerId: string) {
    return this.tournamentService.addPlayer(+tournamentId, +playerId);
  }
}

  

