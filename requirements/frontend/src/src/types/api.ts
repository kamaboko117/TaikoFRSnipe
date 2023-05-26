export interface Beatmap {
  artist: string;
  song: string;
  difficulty: string;
  sr: number;
  setId: number;
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
}

export interface Snipe {
  id: number;
  beatmap: Beatmap;
  sniper: Player;
  victim: Player | null;
  timestamp: number;
}
