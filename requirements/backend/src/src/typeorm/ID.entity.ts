import { Column, Entity } from 'typeorm';

@Entity()
export class IDs {
  @Column({ type: 'array', nullable: false })
  ids: number[];
}
