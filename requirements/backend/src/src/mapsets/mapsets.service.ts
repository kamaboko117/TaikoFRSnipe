import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mapset } from 'src/typeorm/mapset.entity';
import { Repository } from 'typeorm';
import { MapsetData } from 'src/types/mapset';

export
@Injectable()
class MapsetsService {
  constructor(
    @InjectRepository(Mapset) private mapsetsRepository: Repository<Mapset>,
  ) {}

  async createMapset(mapset: Mapset): Promise<Mapset> {
    return this.mapsetsRepository.save(mapset);
  }

  async createMapsetFromData(mapsetData: MapsetData): Promise<Mapset> {
    const mapset = new Mapset();
    mapset.id = mapsetData.id;
    mapset.artist = mapsetData.artist;
    mapset.song = mapsetData.title;
    mapset.beatmaps = [];
    return this.createMapset(mapset);
  }

  async getMapset(id: number): Promise<Mapset> {
    return this.mapsetsRepository.findOne({
      where: { id: id },
      relations: ['beatmaps'],
    });
  }

  async getAllMapsets(): Promise<Mapset[]> {
    return this.mapsetsRepository.find({ relations: ['beatmaps'] });
  }

  async searchMapsets(query: string): Promise<Mapset[]> {
    const limit = 20;
    return (
      this.mapsetsRepository
        .createQueryBuilder('mapset')
        .leftJoinAndSelect('mapset.beatmaps', 'beatmap')
        .where('mapset.artist ILIKE :query', { query: `%${query}%` })
        .orWhere('mapset.song ILIKE :query', { query: `%${query}%` })
        // .orWhere('mapset.beatmap.mapper ILIKE :query', { query: `%${query}%` })
        .limit(limit)
        .getMany()
    );
  }
}
