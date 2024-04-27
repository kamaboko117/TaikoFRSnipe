import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ID } from "src/typeorm/ID.entity";
import { Repository } from "typeorm";

@Injectable()
export class IDsService {
  constructor(
    @InjectRepository(ID)
    private idsRepository: Repository<ID>
  ) {}

  getIds() {
    return this.idsRepository.find();
  }

  async addIds(ids: number[]) {
    for (const id of ids) {
      const existingId = await this.idsRepository.findOne({ where: { id } });
      if (!existingId) {
        await this.idsRepository.insert({ id });
      }
    }
  }
}