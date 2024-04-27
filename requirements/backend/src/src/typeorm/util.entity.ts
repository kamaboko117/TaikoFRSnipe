import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Util {
  @PrimaryGeneratedColumn()
  i: number;

  @Column()
  id: number;
}