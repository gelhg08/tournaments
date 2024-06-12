import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournaments.entity';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';
import { Player } from '../../players/entities/players.entity';
import { PaginationDto } from 'src/global/pagination/pagination.dto';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const tournament = this.tournamentRepository.create(createTournamentDto);
    return this.tournamentRepository.save(tournament);
  }

  async findAll(paginationDto: PaginationDto): Promise<Tournament[]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'ASC',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const options: FindManyOptions<Tournament> = {
      relations: ['players', 'results'],
      skip,
      take: limit,
      order: { [sortBy]: sortOrder },
    };

    return this.tournamentRepository.find(options);
  }

  async findOne(id: number): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id },
      relations: ['players', 'results'],
    });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return tournament;
  }

  async update(
    id: number,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<Tournament> {
    const tournament = await this.tournamentRepository.preload({
      id: id,
      ...updateTournamentDto,
    });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return this.tournamentRepository.save(tournament);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tournamentRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
  }

  async addPlayer(tournamentId: number, playerId: number): Promise<Tournament> {
    const tournament = await this.findOne(tournamentId);
    const player = await this.playerRepository.findOneBy({ id: playerId });

    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }

    tournament.players = [...tournament.players, player];
    return this.tournamentRepository.save(tournament);
  }

  async removePlayer(
    tournamentId: number,
    playerId: number,
  ): Promise<Tournament> {
    const tournament = await this.findOne(tournamentId);

    tournament.players = tournament.players.filter(
      (player) => player.id !== playerId,
    );
    return this.tournamentRepository.save(tournament);
  }
}
