import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournaments.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentsRepository: Repository<Tournament>,
  ) {}

  async create(tournamentData: Tournament): Promise<Tournament> {
    const tournament = this.tournamentsRepository.create(tournamentData);
    return await this.tournamentsRepository.save(tournament);
  }

  async findAll(page: number, limit: number): Promise<Tournament[]> {
    const [tournament, total] = await this.tournamentsRepository.findAndCount({take: limit, skip: (page - 1) * limit,
    }); 
    return tournament;
}

  async findOne(id: number): Promise<Tournament> {
    return this.tournamentsRepository.findOne({
      where: { id },
      relations: ['players'],
    });
  }

  async update(id: number, tournamentData: Tournament): Promise<Tournament> {
    await this.tournamentsRepository.update(id, tournamentData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tournamentsRepository.softDelete(id);
  }
}
