import { Controller, Get, Query } from "@nestjs/common";
import { MapsetsService } from "./mapsets.service";


@Controller('mapsets')
export class MapsetsController {
  constructor(private mapsetsService: MapsetsService) {}

  @Get('search')
  async searchMapsets(@Query('query') query: string) {
    return this.mapsetsService.searchMapsets(query);
  }
}
