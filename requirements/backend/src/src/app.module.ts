import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeatmapsModule } from './beatmaps/beatmaps.module';
import { ScoresModule } from './scores/scores.module';
import { PlayersModule } from './players/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BeatmapsModule, ScoresModule, PlayersModule
  ]
})
export class AppModule {}
