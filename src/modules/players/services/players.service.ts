import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Player } from '../../players/entities/players.entity';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { PaginationDto } from '../../../global/pagination/pagination.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto[]): Promise<Player[]> {
    const players = this.playerRepository.create(createPlayerDto);
    return this.playerRepository.save(players);
  }

  async findAll(paginationDto: PaginationDto): Promise<Player[]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'ASC',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const options: FindManyOptions<Player> = {
      relations: ['tournaments', 'resultsAsWinner', 'resultsAsLoser'],
      skip,
      take: limit,
      order: { [sortBy]: sortOrder },
    };

    return this.playerRepository.find(options);
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.playerRepository.findOne({
      where: { id },
      relations: ['tournaments', 'resultsAsWinner', 'resultsAsLoser'],
    });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.playerRepository.preload({
      ...updatePlayerDto,
    });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return this.playerRepository.save(player);
  }

  async remove(id: number): Promise<void> {
    const result = await this.playerRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
  }
}
