import { Score } from "src/types/score";
import { Column, Entity, PrimaryColumn } from "typeorm";

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

  @Column({ nullable: false })
  acc: number;

  @Column("text", { array: true, nullable: false })
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
