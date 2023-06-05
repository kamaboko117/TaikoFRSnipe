import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Beatmap } from 'src/typeorm/beatmap.entity';
import { BeatmapData, MapsetData, RootObject } from 'src/types/mapset';
import { Repository } from 'typeorm';
// import { got } from 'got';
import { CookieJar } from 'tough-cookie';
import { JSDOM } from 'jsdom';
import { ApiScore } from 'src/types/score';
import { ScoresService } from 'src/scores/scores.service';
import { PlayersService } from 'src/players/players.service';
import { ScoreEntity } from 'src/typeorm/score.entity';
import { Snipe } from 'src/typeorm/snipe.entity';
import { SnipesService } from 'src/snipes/snipes.service';
import { getCookieJar } from 'src/utils/jar';
import * as fs from 'fs';
import { Player } from 'src/typeorm/player.entity';
import { MapsetsService } from 'src/mapsets/mapsets.service';

const isUnranked = (mapsetData: MapsetData) =>
  mapsetData.status !== 'ranked' && mapsetData.status !== 'approved';

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const scrapMapsetData = async (id: number): Promise<MapsetData | undefined> => {
  const beatmapDataUrl = 'https://osu.ppy.sh/beatmaps/' + id;
  const got = await import('got');
  // const response = await got(beatmapDataUrl);
  // treat errors
  const response = await got
    .default(beatmapDataUrl, {
      timeout: { request: 5000 },
    })
    .catch((err) => {
      if (err instanceof got.HTTPError && err.response.statusCode === 429) {
        throw new Error('Rate limit exceeded');
      }
      console.log(`${err.response.statusCode} on id ${id}`);
    });
  if (!response) return undefined;
  const dom = new JSDOM(response.body);
  const data = dom.window.document.getElementById('json-beatmapset');
  if (data) {
    const mapsetRootData: RootObject = JSON.parse(data.innerHTML);
    const mapsetData: MapsetData = {
      id: mapsetRootData.id,
      artist: mapsetRootData.artist,
      title: mapsetRootData.title,
      creator: mapsetRootData.creator,
      status: mapsetRootData.status,
      beatmaps: mapsetRootData.beatmaps.map((beatmap) => {
        return {
          id: beatmap.id,
          version: beatmap.version,
          difficulty_rating: beatmap.difficulty_rating,
          total_length: beatmap.total_length,
          bpm: beatmap.bpm,
          drain: beatmap.drain,
          accuracy: beatmap.accuracy,
          mode: beatmap.mode,
        };
      }),
    };

    if (isUnranked(mapsetData)) {
      return undefined;
    }

    return mapsetData;
  }
  return undefined;
};

const fetchMapsetDataChimu = async (
  id: number,
): Promise<MapsetData | undefined> => {
  const url1 = 'https://api.chimu.moe/v1/map/' + id;
  const url2 = 'https://api.chimu.moe/v1/set/';

  const data1 = await fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        return undefined;
      }
      return data;
    });
  if (!data1) {
    return undefined;
  }
  const data2 = await fetch(url2 + data1.ParentSetId)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        return undefined;
      }
      return data;
    });
  if (!data2) {
    return undefined;
  }
  let rankedStatus = [
    'ranked',
    'approved',
    'qualified',
    'loved',
    'pending',
    'WIP',
    'graveyard',
  ];
  if (data2.RankedStatus != 0 || data2.RankedStatus != 1) {
    throw new Error('Mapset is not ranked');
  }
  const beatmaps: BeatmapData[] = data2.ChildrenBeatmaps.map(
    (beatmap: {
      BeatmapId: any;
      DiffName: any;
      DifficultyRating: any;
      TotalLength: any;
      BPM: any;
      OD: any;
      HP: any;
    }) => {
      return {
        id: beatmap.BeatmapId,
        version: beatmap.DiffName,
        difficulty_rating: beatmap.DifficultyRating,
        total_length: beatmap.TotalLength,
        bpm: beatmap.BPM,
        accuracy: beatmap.OD,
        drain: beatmap.HP,
        mode: data2.Mode,
      };
    },
  );

  const mapsetData: MapsetData = {
    id: data2.SetId,
    artist: data2.Artist,
    title: data2.Title,
    status: rankedStatus[data2.RankedStatus],
    creator: data2.Creator,
    beatmaps: beatmaps,
  };
  return mapsetData;
};

const fetchMapsetDataOsuDirect = async (
  id: number,
): Promise<MapsetData | undefined> => {
  const url = `https://osu.direct/api/v2/b/${id}`;

  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        return undefined;
      }
      return data;
    });
  if (!data) {
    return undefined;
  }
  const mapsetId = data.beatmapset_id;
  const mapsetUrl = `https://osu.direct/api/v2/s/${mapsetId}`;
  data = await fetch(mapsetUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        return undefined;
      }
      return data;
    });
  if (!data) {
    return undefined;
  }
  const beatmaps: BeatmapData[] = data.beatmaps.map(
    (beatmap: {
      id: any;
      version: any;
      difficulty_rating: any;
      total_length: any;
      bpm: any;
      accuracy: any;
      drain: any;
      mode: any;
    }) => {
      return {
        id: beatmap.id,
        version: beatmap.version,
        difficulty_rating: beatmap.difficulty_rating,
        total_length: beatmap.total_length,
        bpm: beatmap.bpm,
        accuracy: beatmap.accuracy,
        drain: beatmap.drain,
        mode: beatmap.mode,
      };
    },
  );

  const mapsetData: MapsetData = {
    id: data.id,
    artist: data.artist,
    title: data.title,
    status: data.status,
    creator: data.creator,
    beatmaps: beatmaps,
  };
  return mapsetData;
};

const scrapScores = async (id: number, jar: CookieJar) => {
  const url =
    'https://osu.ppy.sh/beatmaps/' + id + '/scores?type=country&mode=taiko';
  const got = (await import('got')).default;
  const response = await got(url, {
    cookieJar: jar,
    timeout: { request: 5000 },
  }).catch((err) => {
    if (err.response?.statusCode === 429) {
      throw new Error('Rate limit exceeded');
    }
    console.log(`${err.response.statusCode} on id ${id}`);
  });
  if (!response) return undefined;
  const scores: ApiScore[] = JSON.parse(response.body ?? '[]').scores;
  return scores;
};

const createBeatmap = async (
  id: number,
  mapsetsService: MapsetsService,
  { batch = false },
) => {
  // calculate how long it takes to create beatmap
  const start = Date.now();
  let mapsetDataProvider: { (id: number): Promise<MapsetData> };
  if (batch) {
    mapsetDataProvider = fetchMapsetDataOsuDirect;
  } else {
    mapsetDataProvider = scrapMapsetData;
  }
  const mapsetData = await mapsetDataProvider(id);
  if (!mapsetData) {
    throw new Error('Beatmap not found');
  }
  // let mapset = await mapsetsService.getMapset(mapsetData.id);
  let mapset = await mapsetsService.getMapset(mapsetData.id);
  if (!mapset) {
    mapset = await mapsetsService.createMapsetFromData(mapsetData);
  }
  const beatmapData = mapsetData.beatmaps.find((beatmap) => beatmap.id == id);
  if (!beatmapData) {
    throw new Error('Beatmap not found');
  }

  if (beatmapData.mode != 'taiko') {
    throw new Error('Beatmap is not taiko');
  }

  const beatmap = new Beatmap();
  beatmap.artist = mapsetData.artist;
  beatmap.song = mapsetData.title;
  beatmap.difficulty = beatmapData.version;
  beatmap.sr = beatmapData.difficulty_rating;
  // beatmap.setId = mapsetData.id;
  beatmap.mapset = mapset;
  beatmap.id = beatmapData.id;
  beatmap.od = beatmapData.accuracy;
  beatmap.bpm = beatmapData.bpm;
  beatmap.hp = beatmapData.drain;
  beatmap.drain = beatmapData.total_length;
  beatmap.mapper = mapsetData.creator;
  beatmap.unranked = isUnranked(mapsetData);

  const end = Date.now();
  console.log('Beatmap created in ' + (end - start) + 'ms');

  return beatmap;
};

const createNewScore = (
  score: ApiScore,
  id: number,
  player: Player,
  beatmap: Beatmap,
) => {
  const newScore = new ScoreEntity();
  newScore.id = score.id;
  newScore.beatmapId = id;
  newScore.beatmap = beatmap;
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
    private readonly mapsetsService: MapsetsService,
  ) {}

  private async updateScores(
    beatmap: Beatmap,
    scoresService: ScoresService,
    playersService: PlayersService,
    snipesService: SnipesService,
  ) {
    const jar = await getCookieJar();
    const scores = await scrapScores(beatmap.id, jar);
    if (!scores) {
      throw new Error('Scores not found');
    }
    if (scores.length === 0) {
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
    if (!existingScore) {
      const player = await playersService.getPlayer(topScore.user_id);
      const newScore = createNewScore(topScore, beatmap.id, player, beatmap);
      await scoresService.createScore(newScore);
      beatmap.topPlayer = {
        id: topScore.user_id,
        name: topScore.user.username,
      };
      playersService.updatePlayer(topScore.user_id);
      let newSnipe = createNewSnipe(null, topScore, player, beatmap);
      await snipesService.createSnipe(newSnipe);
      return topScore.user_id;
    }
    if (
      existingScore.score < topScore.total_score ||
      (existingScore.score === topScore.total_score && !beatmap.topPlayer)
    ) {
      const snipedPlayer = existingScore.player;
      if (existingScore.player.id !== player.id) {
        let newSnipe = createNewSnipe(existingScore, topScore, player, beatmap);
        await snipesService.createSnipe(newSnipe);
      } else {
        let newSnipe = createNewSnipe(null, topScore, player, beatmap);
        await snipesService.createSnipe(newSnipe);
      }
      beatmap.topPlayer = {
        id: topScore.user_id,
        name: topScore.user.username,
      };
      await scoresService.updateScoreByBeatmapId(
        beatmap.id,
        createNewScore(topScore, beatmap.id, player, beatmap),
      );
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

  getBeatmaps(limit: number, offset: number) {
    return this.beatmapRepository.find({
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    });
  }
  getBeatmap(id: number) {
    console.log(`Getting beatmap ${id}`);
    return this.beatmapRepository.findOne({
      where: { id: id },
      relations: ['mapset', 'mapset.beatmaps'],
    });
  }

  searchBeatmaps(query: string) {
    const limit = 10;
    return this.beatmapRepository
      .createQueryBuilder('beatmap')
      .leftJoinAndSelect('beatmap.mapset', 'mapset')
      .where('beatmap.song ILIKE :query', { query: `%${query}%` })
      .orWhere('beatmap.artist ILIKE :query', { query: `%${query}%` })
      .orWhere('beatmap.mapper ILIKE :query', { query: `%${query}%` })
      .orWhere('beatmap.difficulty ILIKE :query', { query: `%${query}%` })
      .take(limit)
      .getMany();
  }

  async updateBeatmap(id: number, { batch = false }) {
    let beatmap = await this.beatmapRepository.findOneBy({ id: id });
    if (!beatmap) {
      try {
        beatmap = await createBeatmap(id, this.mapsetsService, {
          batch: batch,
        });
        await this.beatmapRepository.save(beatmap);
        await this.updateScores(
          beatmap,
          this.scoreService,
          this.playersService,
          this.snipesService,
        );
        return this.beatmapRepository.save(beatmap);
      } catch (e) {
        console.log(e.message);
        if (e.message === 'Rate limit exceeded') throw e;
        return;
      }
    }
    //time how long it takes to update
    const start = Date.now();
    await this.updateScores(
      beatmap,
      this.scoreService,
      this.playersService,
      this.snipesService,
    );
    const end = Date.now();
    console.log(`Updated beatmap ${id} in ${end - start}ms`);

    return this.beatmapRepository.save(beatmap);
  }

  populateBeatmaps() {
    // open beatmapIDs.json with fs
    fs.readFile('beatmapIds.json', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const beatmapIDs = JSON.parse(data.toString());
      for (let i = 0; i < beatmapIDs.length; i++) {
        const start = 10000;
        const limit = 30000;
        const found = await this.beatmapRepository.findOneBy({
          id: beatmapIDs[i],
        });
        if (i < start || found) {
          continue;
        }
        if (i % 4 === 1) {
          console.log(`Updating beatmap ${i} of ${beatmapIDs.length}`);
        }
        if (i > limit) {
          break;
        }
        const beatmapID = beatmapIDs[i];
        try {
          await this.updateBeatmap(beatmapID, { batch: true });
        } catch (e) {
          console.log(`Error updating beatmap ${beatmapID}`);
          console.log(e);
          if (e.message === 'Scores not found') {
            continue;
          }
          return;
        }
        await sleep(2000); //to not get ratelimited
      }
    });
  }
}
