import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Result } from '../entities/result.entity';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { Player } from '../../players/entities/players.entity';
import { Tournament } from '../../tournaments/entities/tournaments.entity';
import { PaginationDto } from 'src/global/pagination/pagination.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    const { tournamentId, winnerId, loserId, winnerScore, loserScore } = createResultDto;

    const tournament = await this.tournamentRepository.findOneBy({ id: tournamentId });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }

    const winner = await this.playerRepository.findOneBy({ id: winnerId });
    if (!winner) {
      throw new NotFoundException(`Player with ID ${winnerId} not found`);
    }

    const loser = await this.playerRepository.findOneBy({ id: loserId });
    if (!loser) {
      throw new NotFoundException(`Player with ID ${loserId} not found`);
    }

    const result = this.resultRepository.create({
      tournament,
      winner,
      loser,
      winnerScore,
      loserScore,
    });

    return this.resultRepository.save(result);
  }

  async findAll(paginationDto: PaginationDto): Promise<Result[]> {
    const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC' } = paginationDto;
    const skip = (page - 1) * limit;

    const options: FindManyOptions<Result> = {
      relations: ['tournament', 'winner', 'loser'],
      skip,
      take: limit,
      order: { [sortBy]: sortOrder },
    };

    return this.resultRepository.find(options);
  }

  async findOne(id: number): Promise<Result> {
    const result = await this.resultRepository.findOne({
      where: { id },
      relations: ['tournament', 'winner', 'loser'],
    });
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return result;
  }

  async update(id: number, updateResultDto: UpdateResultDto): Promise<Result> {
    const { tournamentId, winnerId, loserId, winnerScore, loserScore } = updateResultDto;

    const result = await this.resultRepository.preload({
      id,
      winnerScore,
      loserScore,
    });

    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }

    if (tournamentId) {
      const tournament = await this.tournamentRepository.findOneBy({ id: tournamentId });
      if (!tournament) {
        throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
      }
      result.tournament = tournament;
    }

    if (winnerId) {
      const winner = await this.playerRepository.findOneBy({ id: winnerId });
      if (!winner) {
        throw new NotFoundException(`Player with ID ${winnerId} not found`);
      }
      result.winner = winner;
    }

    if (loserId) {
      const loser = await this.playerRepository.findOneBy({ id: loserId });
      if (!loser) {
        throw new NotFoundException(`Player with ID ${loserId} not found`);
      }
      result.loser = loser;
    }

    return this.resultRepository.save(result);
  }

  async remove(id: number): Promise<void> {
    const result = await this.resultRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
  }
}


