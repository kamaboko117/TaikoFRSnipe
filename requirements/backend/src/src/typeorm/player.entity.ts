import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ScoreEntity } from './score.entity';

@Entity()
export class Player {
  @Column({ nullable: false })
  name: string;

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ nullable: false })
  topFRCount: number;

  @OneToMany(() => ScoreEntity, (score) => score.player)
  scores: ScoreEntity[];

}
