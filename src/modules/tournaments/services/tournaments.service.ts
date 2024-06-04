import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournaments.entity';
import { Player } from '../../players/entities/players.entity';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentsRepository: Repository<Tournament>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const tournament = this.tournamentsRepository.create(createTournamentDto);
    return this.tournamentsRepository.save(tournament);
  }

  async findAll(): Promise<Tournament[]> {
    return this.tournamentsRepository.find({ relations: ['players', 'results'] });
  }

  async findOne(id: number): Promise<Tournament> {
    const tournament = await this.tournamentsRepository.findOne(id, { relations: ['players', 'results'] });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return tournament;
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    await this.tournamentsRepository.update(id, updateTournamentDto);
    const updatedTournament = await this.tournamentsRepository.findOne(id, { relations: ['players', 'results'] });
    if (!updatedTournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return updatedTournament;
  }
  async remove(id: number): Promise<void> {
    const result = await this.tournamentsRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
  }

  async addPlayer(tournamentId: number, playerId: number): Promise<Tournament> {
    const tournament = await this.findOne(tournamentId);
    const player = await this.playerRepository.findOne(playerId);
    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }
    tournament.players.push(player);
    return this.tournamentsRepository.save(tournament);
  }
}
