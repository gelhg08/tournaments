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
import { PlayersService } from '../services/players.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { Query } from '@nestjs/common';
import { Player } from '../entities/players.entity';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an player' })
  @ApiResponse({
    status: 201,
    description: 'The player has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create([createPlayerDto]);
  }

  @Get('all')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Player[]> {
    const players = await this.playerService.findAll({ page, limit });
    if (players.length === 0) {
      throw new NotFoundException('No players found');
    }
    return players;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an player by ID' })
  @ApiResponse({ status: 200, description: 'Return the player.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an player' })
  @ApiResponse({
    status: 200,
    description: 'The player has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an player' })
  @ApiResponse({
    status: 204,
    description: 'The player has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  remove(@Param('id') id: string) {
    return this.playerService.remove(+id);
  }
}
