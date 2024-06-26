import { Score } from 'src/types/score';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Player } from './player.entity';
import { Beatmap } from './beatmap.entity';

@Entity()
export class ScoreEntity implements Score {
  @PrimaryColumn({ type: 'bigint', nullable: false })
  id: number;

  @ManyToOne(() => Player, (player) => player)
  player: Player;

  @Column({ nullable: false })
  beatmapId: number;

  @ManyToOne(() => Beatmap, (beatmap) => beatmap)
  beatmap: Beatmap;

  @Column({ nullable: false })
  score: number;

  @Column({ type: 'decimal', precision: 18, scale: 17, nullable: false })
  acc: number;

  @Column('text', { array: true, nullable: false })
  mods: string[];

  @Column({ type: 'timestamptz', nullable: false })
  date: string;

  @Column({ type: 'decimal', precision: 7, scale: 3, nullable: false })
  pp: number;

  @Column({ nullable: false })
  missCount: number;

  @Column({ nullable: false })
  maxCombo: number;
}
