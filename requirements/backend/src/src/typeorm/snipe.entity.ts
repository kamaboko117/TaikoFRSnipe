import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Snipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  sniperId: number;

  @Column({ nullable: true })
  victimId: number;

  @Column({ nullable: false })
  beatmapId: number;

  @Column({ type: "timestamptz" ,nullable: false })
  timestamp: Date;
}
