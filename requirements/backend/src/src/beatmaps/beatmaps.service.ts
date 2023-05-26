import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Beatmap } from 'src/typeorm/beatmap.entity';
import { RootObject } from 'src/types/mapset';
import { Repository } from 'typeorm';
// import { got } from 'got';
import { CookieJar } from 'tough-cookie';
import { JSDOM } from 'jsdom';
import { ApiScore } from 'src/types/score';
import { ScoresService } from 'src/scores/scores.service';
import { PlayersService } from 'src/players/players.service';
import { ScoreEntity } from 'src/typeorm/score.entity';
import { Snipe } from 'src/typeorm/snipe.entity';
import { SnipesService } from 'src/Snipes/snipes.service';
import { getCookieJar } from 'src/utils/jar';
import * as fs from 'fs';
import { Player } from 'src/typeorm/player.entity';

const isUnranked = (mapsetData: RootObject) => mapsetData.status !== 'ranked';

const scrapMapsetData = async (id: number): Promise<RootObject | undefined> => {
  console.log(id);
  const beatmapDataUrl = 'https://osu.ppy.sh/beatmaps/' + id;
  const got = (await import('got')).default;
  const response = await got(beatmapDataUrl);
  const dom = new JSDOM(response.body);
  const data = dom.window.document.getElementById('json-beatmapset');
  if (data) {
    return JSON.parse(data.innerHTML);
  }
  return undefined;
};

const scrapScores = async (id: number, jar: CookieJar) => {
  const url =
    'https://osu.ppy.sh/beatmaps/' + id + '/scores?type=country&mode=taiko';
  const got = (await import('got')).default;
  let log_file = fs.createWriteStream('/app/debug.log', { flags: 'w' });
  const response = await got(url, {
    cookieJar: jar,
    timeout: { request: 5000 },
  }).catch((err) => {
    log_file.write(err.response.body);
  });
  if (!response) return undefined;
  const scores: ApiScore[] = JSON.parse(response.body ?? '[]').scores;
  return scores;
};

const createBeatmap = async (id: number) => {
  const mapsetData = await scrapMapsetData(id);
  if (!mapsetData) {
    throw new Error('Beatmap not found');
  }

  const beatmapData = mapsetData.beatmaps.find((beatmap) => beatmap.id == id);
  if (!beatmapData) {
    throw new Error('Beatmap not found');
  }

  console.log('Creating beatmap');
  const beatmap = new Beatmap();
  beatmap.artist = mapsetData.artist;
  beatmap.song = mapsetData.title;
  beatmap.difficulty = beatmapData.version;
  beatmap.sr = beatmapData.difficulty_rating;
  beatmap.setId = mapsetData.id;
  beatmap.id = beatmapData.id;
  beatmap.od = beatmapData.accuracy;
  beatmap.bpm = beatmapData.bpm;
  beatmap.hp = beatmapData.drain;
  beatmap.drain = beatmapData.total_length;
  beatmap.mapper = mapsetData.creator;
  beatmap.unranked = isUnranked(mapsetData);

  return beatmap;
};

const createNewScore = (score: ApiScore, id: number, player: Player) => {
  const newScore = new ScoreEntity();
  newScore.id = score.id;
  newScore.beatmapId = id;
  newScore.player = player;
  newScore.score = score.total_score;
  newScore.maxCombo = score.max_combo;
  newScore.pp = score.pp;
  newScore.acc = score.accuracy;
  newScore.mods = score.mods.map((mod) => mod.acronym);
  newScore.date = score.ended_at;
  newScore.missCount = score.statistics.miss ?? 0;

  return newScore;
};

const createNewSnipe = (
  existingScore: ScoreEntity | null,
  score: ApiScore,
  sniper: Player,
  beatmap: Beatmap,
) => {
  const newSnipe = new Snipe();
  newSnipe.sniper = sniper;
  newSnipe.victim = existingScore ? existingScore.player : null;
  newSnipe.beatmap = beatmap;
  newSnipe.timestamp = new Date(score.ended_at);

  return newSnipe;
};

@Injectable()
export class BeatmapsService {
  constructor(
    @InjectRepository(Beatmap)
    private beatmapRepository: Repository<Beatmap>,
    private readonly scoreService: ScoresService,
    private readonly playersService: PlayersService,
    private readonly snipesService: SnipesService,
  ) {}

  private async updateScores(
    beatmap: Beatmap,
    scoresService: ScoresService,
    playersService: PlayersService,
    snipesService: SnipesService,
  ) {
    console.log('Updating scores');
    const jar = await getCookieJar();
    const scores = await scrapScores(beatmap.id, jar);
    if (!scores) {
      throw new Error('Scores not found');
    }
    if (scores.length === 0) {
      console.log('No scores in France');
      return;
    }
    const topScore = scores[0];
    // if (await scoresService.getScore(topScore.id)) {
    //   console.log('Score already exists')
    //   console.log(await scoresService.getScore(topScore.id))
    //   return;
    // }
    const player = await playersService.getPlayer(topScore.user_id);
    if (!player) {
      await playersService.createPlayer(
        topScore.user_id,
        topScore.user.username,
      );
    }

    let existingScore = await scoresService.getScoreByBeatmapId(beatmap.id);
    console.log(
      `Existing score: ${existingScore?.player.name} - ${beatmap.song}`,
    );
    if (!existingScore) {
      const player = await playersService.getPlayer(topScore.user_id);
      const newScore = createNewScore(topScore, beatmap.id, player);
      await scoresService.createScore(newScore);
      beatmap.topPlayer = {
        id: topScore.user_id,
        name: topScore.user.username,
      };
      playersService.updatePlayer(topScore.user_id);
      let newSnipe = createNewSnipe(null, topScore, player, beatmap);
      await snipesService.createSnipe(newSnipe);
      console.log(`New top score: ${topScore.user.username} - ${beatmap.song}`);
      return topScore.user_id;
    }

    if (
      existingScore.score < topScore.total_score ||
      (existingScore.score === topScore.total_score && !beatmap.topPlayer)
    ) {
      console.log(
        `New top score: ${topScore.user.username} - ${beatmap.song} - ${existingScore.score} -> ${topScore.total_score}`,
      );
      const snipedPlayer = await playersService.getPlayer(
        existingScore.player.id,
      );
      if (existingScore.player.id !== player.id) {
        let newSnipe = createNewSnipe(existingScore, topScore, player, beatmap);
        await snipesService.createSnipe(newSnipe);
      } else {
        let newSnipe = createNewSnipe(null, topScore, player, beatmap);
        await snipesService.createSnipe(newSnipe);
      }
      await scoresService.updateScore(
        createNewScore(topScore, beatmap.id, player),
      );
      beatmap.topPlayer = {
        id: topScore.user_id,
        name: topScore.user.username,
      };
      console.log(beatmap.topPlayer.name);
      await playersService.updatePlayer(topScore.user_id);
      if (snipedPlayer) {
        await playersService.updatePlayer(snipedPlayer.id);
      }
      return {
        victim: existingScore.player.name,
        sniper: topScore.user.username,
      };
    }
  }

  getBeatmaps() {
    return this.beatmapRepository.find();
  }
  getBeatmap(id: number) {
    console.log(`Getting beatmap ${id}`);
    return this.beatmapRepository.findOneBy({ id: id });
  }

  async updateBeatmap(id: number) {
    console.log(`Updating beatmap ${id}`);
    let beatmap = await this.beatmapRepository.findOneBy({ id: id });
    if (!beatmap) {
      try {
        console.log(`new beatmap ${id}`);
        beatmap = await createBeatmap(id);
        await this.beatmapRepository.save(beatmap);
        await this.updateScores(
          beatmap,
          this.scoreService,
          this.playersService,
          this.snipesService,
        );
        console.log('beatmap created');
        return this.beatmapRepository.save(beatmap);
      } catch (e) {
        throw new Error(e.message);
      }
    }
    await this.updateScores(
      beatmap,
      this.scoreService,
      this.playersService,
      this.snipesService,
    );

    console.log(beatmap.topPlayer);

    return this.beatmapRepository.save(beatmap);
  }
}
