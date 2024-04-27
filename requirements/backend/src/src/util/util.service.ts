import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Util } from "src/typeorm/util.entity";
import { Repository } from "typeorm";

@Injectable()
export class UtilService {
  constructor(
    @InjectRepository(Util)
    private utilRepository: Repository<Util>
  ) {}

  async getId() {
    // there is only one row in the table
    const util = await this.utilRepository.find({});
    if (util.length > 0) {
      return util[0].id;
    } else {
      return null;
    }
  }

  async updateId(id: number) {
    // there is only one row in the table
    await this.utilRepository.update({}, { id });
  }

  // do not create a new row if one already exists
  async createUtil() {
    const util = await this.utilRepository.find({});
    if (util.length === 0) {
      await this.utilRepository.insert({ id: 0 });
    }
  }
}