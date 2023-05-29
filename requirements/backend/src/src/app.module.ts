import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeatmapsModule } from './beatmaps/beatmaps.module';
import { ScoresModule } from './scores/scores.module';
import { PlayersModule } from './players/players.module';

const isProduction = process.env.NODE_ENV === 'production';

const prodFactory = {
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  url: process.env.DATABASE_URL,
  port: Number(process.env.POSTGRES_PORT),
  autoLoadEntities: true,
  synchronize: false,
};

const devFactory = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  synchronize: true,
  autoLoadEntities: true,
  port: Number(process.env.POSTGRES_PORT),
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => (isProduction ? (prodFactory as any) : devFactory),
      inject: [ConfigService],
    }),
    BeatmapsModule,
    ScoresModule,
    PlayersModule,
  ],
})
export class AppModule {}
