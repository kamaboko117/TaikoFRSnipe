import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ID {
  @PrimaryColumn({ type: 'int', nullable: false })
  id: number;
}
