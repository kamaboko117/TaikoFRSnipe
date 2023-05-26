import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class Snipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "simple-json", nullable: false })
  sniper: Player;

  @Column({type: "simple-json", nullable: true })
  victim: Player;

  @Column({ nullable: false })
  beatmapId: number;

  @Column({ type: "timestamptz" ,nullable: false })
  timestamp: Date;
}
