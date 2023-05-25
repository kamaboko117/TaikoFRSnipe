import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Snipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  sniperId: number;

  @Column({ nullable: false })
  victimId: number;

  @Column({ nullable: false })
  beatmapId: number;

  @Column({ nullable: false })
  timestamp: number;
}
