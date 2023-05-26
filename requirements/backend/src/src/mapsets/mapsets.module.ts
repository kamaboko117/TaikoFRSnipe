import { Module } from "@nestjs/common";
import { MapsetsService } from "./mapsets.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mapset } from "../typeorm/mapset.entity";

@Module({
  controllers: [],
  providers: [MapsetsService],
  exports: [MapsetsService],
  imports: [TypeOrmModule.forFeature([Mapset])],
})
export class MapsetsModule {}
