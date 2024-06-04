import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, DeleteDateColumn } from 'typeorm';
import {Tournament} from '../../tournaments/entities/tournaments.entity'

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToMany(() => Tournament, tournament => tournament.players)
  tournaments: Tournament[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
