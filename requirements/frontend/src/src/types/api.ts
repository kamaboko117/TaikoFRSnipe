export interface Mapset {
  artist: string;
  song: string;
  id: number;
  beatmaps: Beatmap[];
}

export interface Beatmap {
  artist: string;
  song: string;
  difficulty: string;
  sr: number;
  mapset: Mapset;
  id: number;
  od: number;
  bpm: number;
  hp: number;
  drain: number;
  mapper: string;
  topPlayer: {
    id: number;
    name: string;
  };
  lastUpdated: number;
  unranked: boolean;
}

export interface Player {
  id: number;
  name: string;
  topFRCount: number;
  scores: Score[];
}

export interface Snipe {
  id: number;
  beatmap: Beatmap;
  sniper: Player;
  victim: Player | null;
  timestamp: number;
}

export interface Score {
  acc: number;
  beatmapId: number;
  date: string;
  id: number;
  maxCombo: number;
  missCount: number;
  mods: string[];
  pp: number;
  score: number;
  player: Player;
  beatmap: Beatmap;
}

export interface hof {
  highestPPPlay: Score;
  longestPlay: Score;
  mostMisses: Score;
  lessAcc: Score;
  FLModLover: Player;
  // HDModLover: Player;
  // HRModLover: Player;
  // DTModLover: Player;
  // EZModLover: Player;
  // NCModLover: Player;
  OldestScore: Score;
}
