import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Util {
  @PrimaryColumn()
  id: number;
}