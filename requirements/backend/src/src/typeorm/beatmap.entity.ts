import { Column, Entity, PrimaryColumn } from 'typeorm';

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

  @Column({ nullable: false })
  setId: number;

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

  @Column({ nullable: true })
  topPlayerId: number;

  // @Column({ nullable: false })
  // lastUpdated: number;

  @Column({ nullable: false })
  unranked: boolean;
}
