import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  getPlayers() {
    return this.playersService.getPlayers();
  }

  @Get('search')
  searchPlayersByName(@Query('name') name: string) {
    console.log(`Getting player ${name}`);
    return this.playersService.searchPlayersByName(name);
  }

  @Get('top')
  getTopPlayers(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('order') order: 'ASC' | 'DESC',
  ) {
    if (limit > 100) {
      limit = 100;
    }
    console.log(`Getting top players`);
    return this.playersService.getTopPlayers(limit, offset, order);
  }

  @Get(':id')
  getPlayer(@Param() { id }: { id: number }) {
    console.log(`searching for player ${id}`);
    return this.playersService.getPlayer(id);
  }
}
