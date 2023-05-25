import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Player {
  @Column({ nullable: false })
  name: string;

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ nullable: false })
  topFRCount: number;
}
