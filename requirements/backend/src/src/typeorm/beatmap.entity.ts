import { Column, Entity } from 'typeorm';

@Entity()
export class Beatmap {
  @Column({ nullable: false })
  artist: string;

  @Column({ nullable: false })
  song: string;

  @Column({ nullable: false })
  difficulty: string;

  @Column({ nullable: false })
  sr: number;

  @Column({ nullable: false })
  setId: number;

  @Column({ nullable: false })
  id: number;

  @Column({ nullable: false })
  od: number;

  @Column({ nullable: false })
  bpm: number;

  @Column({ nullable: false })
  hp: number;

  @Column({ nullable: false })
  drain: number;

  @Column({ nullable: false })
  mapper: string;

  @Column({ nullable: false })
  topPlayerId: number;

  // @Column({ nullable: false })
  // lastUpdated: number;

  @Column({ nullable: false })
  unranked: boolean;
}
