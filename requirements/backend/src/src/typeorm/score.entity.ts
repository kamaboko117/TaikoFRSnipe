import { Score } from 'src/types/score';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ScoreEntity implements Score {
  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ nullable: false })
  playerId: number;

  @Column({ nullable: false })
  beatmapId: number;

  @Column({ nullable: false })
  score: number;

  @Column({ type: 'decimal', precision: 18, scale: 17, nullable: false })
  acc: number;

  @Column('text', { array: true, nullable: false })
  mods: string[];

  @Column({ type: 'timestamptz', nullable: false })
  date: string;

  @Column({ type: 'decimal', precision: 6, scale: 3, nullable: false })
  pp: number;

  @Column({ nullable: false })
  missCount: number;

  @Column({ nullable: false })
  maxCombo: number;
}
