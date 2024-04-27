import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ID } from "src/typeorm/ID.entity";
import { IDsService } from "./IDs.service";

@Module({
  providers: [IDsService],
  exports: [IDsService],
  imports: [
    TypeOrmModule.forFeature([ID]),
  ]
})
export class IDsModule {}