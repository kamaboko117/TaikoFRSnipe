import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { NotFoundInterceptor } from 'src/interceptor/interceptor';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  // @Get()
  // getPlayers() {
  //   return this.playersService.getPlayers();
  // }

  @Get('search')
  searchPlayersByName(@Query('name') name: string) {
    console.log(`Getting player ${name}`);
    return this.playersService.searchPlayersByName(name);
  }

  @Get('top')
  @UsePipes(ValidationPipe)
  getTopPlayers(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(100), ParseIntPipe) offset: number,
    @Query('order') order: 'ASC' | 'DESC',
  ) {
    if (limit > 100) {
      limit = 100;
    }
    console.log(`Getting top players`);
    return this.playersService.getTopPlayers(limit, offset, order);
  }

  @Get('hof')
  getHallOfFame() {
    console.log(`Getting hall of fame`);
    return this.playersService.getHallOfFame();
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('Player not found'))
  getPlayer(@Param('id', ParseIntPipe) id: number) {
    console.log(`searching for player ${id}`);
    return this.playersService.getPlayer(id);
  }
}
