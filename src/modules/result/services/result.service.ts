import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from '../entities/result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultService {
    constructor(
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>,
      ) {}

      async create(resultData: Result): Promise<Result> {
        const result = this.resultRepository.create(resultData);
        return await this.resultRepository.save(result);
      }

      async findAll(page: number, limit: number): Promise<Result[]> {
        const [result, total] = await this.resultRepository.findAndCount({take: limit, skip: (page - 1) * limit,
        }); 
        return result;
    }
    
      async findOne(id: number): Promise<Result> {
        return await this.resultRepository.findOne({ where: { id }});
      } 
    
    
      async update(id: number, resultData: Result): Promise<Result> {
        await this.resultRepository.update(id, resultData);
        return this.findOne(id);
      }
    
      async remove(id: number): Promise<void> {
        await this.resultRepository.delete(id);
      }
}
