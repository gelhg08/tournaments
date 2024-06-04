import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from '../entities/result.entity';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { Tournament } from 'src/modules/tournaments/entities/tournaments.entity';
import { Player } from'src/modules/players/entities/players.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    const tournament = await this.tournamentRepository.findOne(createResultDto.tournamentId);
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${createResultDto.tournamentId} not found`);
    }

    const winner = await this.playerRepository.findOne(createResultDto.winnerId);
    if (!winner) {
      throw new NotFoundException(`Winner with ID ${createResultDto.winnerId} not found`);
    }

    const loser = await this.playerRepository.findOne(createResultDto.loserId);
    if (!loser) {
      throw new NotFoundException(`Loser with ID ${createResultDto.loserId} not found`);
    }

    const result = this.resultRepository.create({
      tournament,
      winner,
      loser,
      winnerScore: createResultDto.winnerScore,
      loserScore: createResultDto.loserScore,
    });

    return this.resultRepository.save(result);
  }

  async findAll(): Promise<Result[]> {
    return this.resultRepository.find({ relations: ['tournament', 'winner', 'loser'] });
  }

  async findOne(id: number): Promise<Result> {
    const result = await this.resultRepository.findOne(id, { relations: ['tournament', 'winner', 'loser'] });
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return result;
  }

  async update(id: number, updateResultDto: UpdateResultDto): Promise<Result> {
    const result = await this.resultRepository.findOne(id);
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }

    if (updateResultDto.tournamentId) {
      const tournament = await this.tournamentRepository.findOne(updateResultDto.tournamentId);
      if (!tournament) {
        throw new NotFoundException(`Tournament with ID ${updateResultDto.tournamentId} not found`);
      }
      result.tournament = tournament;
    }

    if (updateResultDto.winnerId) {
      const winner = await this.playerRepository.findOne(updateResultDto.winnerId);
      if (!winner) {
        throw new NotFoundException(`Winner with ID ${updateResultDto.winnerId} not found`);
      }
      result.winner = winner;
    }

    if (updateResultDto.loserId) {
      const loser = await this.playerRepository.findOne(updateResultDto.loserId);
      if (!loser) {
        throw new NotFoundException(`Loser with ID ${updateResultDto.loserId} not found`);
      }
      result.loser = loser;
    }

    if (updateResultDto.winnerScore !== undefined) {
      result.winnerScore = updateResultDto.winnerScore;
    }

    if (updateResultDto.loserScore !== undefined) {
      result.loserScore = updateResultDto.loserScore;
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

