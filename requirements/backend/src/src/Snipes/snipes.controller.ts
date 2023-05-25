import { Controller, Get, Param } from "@nestjs/common";
import { SnipesService } from "./snipes.service";

@Controller('snipes')
export class SnipesController {
  constructor(private readonly snipesService: SnipesService) {}

  @Get()
  getSnipes() {
    return this.snipesService.getSnipes();
  }

  @Get('/latest/:limit')
  getSnipesLimit(@Param() { limit }: { limit: number }){
    return this.snipesService.getSnipesLimit(limit);
  }
  
}
