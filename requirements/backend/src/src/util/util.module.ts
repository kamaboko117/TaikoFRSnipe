import { Module } from "@nestjs/common";
import { UtilService } from "./util.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Util } from "src/typeorm/util.entity";

@Module({
    providers: [UtilService],
    exports: [UtilService],
    imports: [
      TypeOrmModule.forFeature([Util]),
    ]
})
export class UtilModule {}