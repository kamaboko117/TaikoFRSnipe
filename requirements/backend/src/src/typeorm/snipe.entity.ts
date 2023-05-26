import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';
import { Beatmap } from './beatmap.entity';

@Entity()
export class Snipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-json', nullable: false })
  sniper: Player;

  @Column({ type: 'simple-json', nullable: true })
  victim: Player;

  @ManyToOne(() => Beatmap, (beatmap) => beatmap)
  beatmap: Beatmap;

  @Column({ type: 'timestamptz', nullable: false })
  timestamp: Date;
}
