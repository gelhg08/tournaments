import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entities/players.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { Tournament } from '../../tournaments/entities/tournaments.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  private async convertTournaments(
    tournamentNames: string[],
  ): Promise<Tournament[]> {
    return Promise.all(
      tournamentNames.map(async (name) => {
        let tournament = await this.tournamentRepository.findOne({
          where: { name },
        });
        if (!tournament) {
          tournament = this.tournamentRepository.create({ name });
          tournament = await this.tournamentRepository.save(tournament);
        }
        return tournament;
      }),
    );
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const tournaments = createPlayerDto.tournaments
      ? await this.convertTournaments(createPlayerDto.tournaments)
      : [];

    const player = this.playerRepository.create({
      name: createPlayerDto.name,
      tournaments,
    });

    return await this.playerRepository.save(player);
  }

  async findAll(page: number, limit: number): Promise<Player[]> {
    const [player, total] = await this.playerRepository.findAndCount({take: limit, skip: (page - 1) * limit,
    }); 
    return player;
}

  async findOne(id: number): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const existingPlayer = await this.findOne(id);
    if (!existingPlayer) {
      throw new Error('Player not found');
    }

    const tournaments = updatePlayerDto.tournaments
      ? await this.convertTournaments(updatePlayerDto.tournaments)
      : existingPlayer.tournaments;

    const updatedPlayer = this.playerRepository.create({
      ...existingPlayer,
      ...updatePlayerDto,
      tournaments,
    });

    await this.playerRepository.save(updatedPlayer);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const author = await this.findOne(id);
    await this.playerRepository.softRemove(author);
  }
}
