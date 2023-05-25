import { Controller, Get, Param } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  getPlayers() {
    return this.playersService.getPlayers();
  }

  @Get(':id')
  getPlayer(@Param() { id }: { id: number }) {
    console.log(`Getting player ${id}`);
    return this.playersService.getPlayer(id);
  }
}
