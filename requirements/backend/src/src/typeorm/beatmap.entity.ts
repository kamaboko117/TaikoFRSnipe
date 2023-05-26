import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Mapset } from './mapset.entity';

@Entity()
export class Beatmap {
  @Column({ nullable: false })
  artist: string;

  @Column({ nullable: false })
  song: string;

  @Column({ nullable: false })
  difficulty: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  sr: number;

  @ManyToOne(() => Mapset, (mapset) => mapset.beatmaps)
  mapset: Mapset;

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  od: number;

  @Column({ nullable: false })
  bpm: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  hp: number;

  @Column({ nullable: false })
  drain: number;

  @Column({ nullable: false })
  mapper: string;

  @Column({ type: 'simple-json', nullable: true })
  topPlayer: {
    id: number;
    name: string;
  };

  // @Column({ nullable: false })
  // lastUpdated: number;

  @Column({ nullable: false })
  unranked: boolean;
}
