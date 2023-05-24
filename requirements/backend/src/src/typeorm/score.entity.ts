import { Score } from "src/types/score";
import { Column, Entity } from "typeorm";

@Entity()
export class ScoreEntity implements Score {
  @Column({ nullable: false })
  id: number;

  @Column({ nullable: false })
  playerId: number;

  @Column({ nullable: false })
  beatmapId: number;

  @Column({ nullable: false })
  score: number;

  @Column({ nullable: false })
  acc: number;

  @Column({ nullable: false })
  mods: string[];

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false })
  pp: number;

  @Column({ nullable: false })
  missCount: number;

  @Column({ nullable: false })
  maxCombo: number;

}