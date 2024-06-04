import { Module } from '@nestjs/common';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { PlayersModule } from './modules/players/players.module';
import { ResultModule } from './modules/result/result.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.DB_PORT || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    TournamentsModule,
    PlayersModule,
    ResultModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
