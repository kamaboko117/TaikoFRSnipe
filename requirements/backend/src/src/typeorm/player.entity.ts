import { Column, Entity } from 'typeorm';

@Entity()
export class Player {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  id: number;

  @Column({ nullable: false })
  topFRCount: number;
}
