import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Beatmap } from './beatmap.entity';

@Entity()
export class Mapset {
  @Column({ nullable: false })
  artist: string;

  @Column({ nullable: false })
  song: string;

  @PrimaryColumn({ nullable: false })
  id: number;

  @OneToMany(() => Beatmap, (beatmap) => beatmap.mapset)
  beatmaps: Beatmap[];

  // @Column({ nullable: false })
  // lastUpdated: number;
}
