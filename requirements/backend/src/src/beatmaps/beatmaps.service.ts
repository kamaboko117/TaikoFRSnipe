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
import { PlayersService } from 'src/players/player.service';
import { ScoreEntity } from 'src/typeorm/score.entity';
import { Snipe } from 'src/typeorm/snipe.entity';
import { SnipesService } from 'src/Snipes/snipes.service';
import { getCookieJar } from 'src/utils/jar';

const isUnranked = (mapsetData: RootObject) => mapsetData.status !== 'ranked';

const scrapMapsetData = async (id: number): Promise<RootObject | undefined> => {
  console.log(id);
  const beatmapDataUrl = "https://osu.ppy.sh/beatmaps/" + id
  const got = (await import('got')).default;
  const response = await got(beatmapDataUrl)
  const dom = new JSDOM(response.body)
  const data = dom.window.document.getElementById("json-beatmapset")
  if (data) {
      return JSON.parse(data.innerHTML)
  }
  return undefined
}

const scrapScores = async (id: number, jar: CookieJar) => {
  const url = "https://osu.ppy.sh/beatmaps/" + id + "/scores?type=country&mode=taiko"
  console.log(url)
  const got = (await import('got')).default;
  console.log(jar)
  const response = await got(url, {cookieJar: jar, timeout: {request: 5000}}).catch(err => console.log((err).response.statusCode))
  console.log(response)
  if (!response) return undefined
  const scores: ApiScore[] = JSON.parse(response.body??"[]").scores
  return scores
}

const createBeatmap = async (id: number) => {
  const mapsetData = await scrapMapsetData(id)
  if (!mapsetData) {
    throw new Error('Beatmap not found');
  }
  
  const beatmapData = mapsetData.beatmaps.find((beatmap) => beatmap.id == id)
  if (!beatmapData) {
    throw new Error('Beatmap not found');
  }

  console.log("Creating beatmap")
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

const createNewScore = (score: ApiScore, scoresService: ScoresService, id: number) => {
  const newScore = new ScoreEntity();
  newScore.id = score.id;
  newScore.beatmapId = id;
  newScore.playerId = score.user_id;
  newScore.score = score.total_score;
  newScore.maxCombo = score.max_combo;
  newScore.pp = score.pp;
  newScore.acc = score.accuracy;
  newScore.date = score.ended_at;

  return newScore
};

const createNewSnipe = (existingScore: ScoreEntity, score: ApiScore, id: number) => {
  const newSnipe = new Snipe();
  newSnipe.sniperId = score.user_id;
  newSnipe.victimId = existingScore.playerId;
  newSnipe.beatmapId = id;
  newSnipe.timestamp = new Date(score.ended_at).getTime();

  return newSnipe
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

  private async updateScores(beatmap: Beatmap, scoresService: ScoresService, playersService: PlayersService, snipesService: SnipesService) {
    const jar = await getCookieJar();
    const scores = await scrapScores(beatmap.id, jar);
    if (!scores) {
      throw new Error('Scores not found');
    }
    if (scores.length === 0) {
      return;
    }
    const topScore = scores[0];
    if (await scoresService.getScore(topScore.id)) {
      return;
    }
    const player = await playersService.getPlayer(topScore.user_id);
    if (!player) {
      await playersService.createPlayer(topScore.user_id, topScore.user.username);
    }
  
    let existingScore = await scoresService.getScoreByBeatmapId(beatmap.id);
    if (!existingScore) {
      let newScore = createNewScore(topScore, scoresService, beatmap.id);
      await scoresService.createScore(newScore);
      beatmap.topPlayerId = topScore.user_id;
      playersService.updatePlayer(topScore.user_id);
      return topScore.user_id;
    }
    
    if (existingScore.score < topScore.total_score) {
      const snipedPlayer = await playersService.getPlayer(existingScore.playerId);
      if (existingScore.playerId !== player.id) {
        let newSnipe = createNewSnipe(existingScore, topScore, beatmap.id);
        await snipesService.createSnipe(newSnipe);
        await this.beatmapRepository.update(beatmap.id, {topPlayerId: topScore.user_id});
      }
      await scoresService.updateScore(createNewScore(topScore, scoresService, beatmap.id));
      await playersService.updatePlayer(topScore.user_id);
      if (snipedPlayer) {
        await playersService.updatePlayer(snipedPlayer.id);
      }
      return {victimId: existingScore.playerId, sniperId: topScore.user_id};
    }
  }
  

  getBeatmaps() {
    return this.beatmapRepository.find();
  }
  getBeatmap(id: number) {
    return this.beatmapRepository.findOneBy({id});
  }

  async updateBeatmap(id: number) {
    console.log(`Updating beatmap ${id}`)	
    let beatmap = await this.beatmapRepository.findOneBy({id: id});
    if (!beatmap) {
      try {
        beatmap = await createBeatmap(id);
        this.updateScores(beatmap, this.scoreService, this.playersService, this.snipesService);
        return this.beatmapRepository.save(beatmap);
      }
      catch (e) {
        throw new Error(e.message);
      }
    }
    this.updateScores(beatmap, this.scoreService, this.playersService, this.snipesService);
    
    return this.beatmapRepository.save(beatmap);
  }
}
