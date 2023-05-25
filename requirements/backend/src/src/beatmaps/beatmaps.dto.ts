import { IsNumber } from "class-validator";

export class updateBeatmapDto {
  @IsNumber()
  id: number;  
}