export interface Score {
  id: number,
  playerId: number,
  beatmapId: number,
  score: number,
  acc: number,
  mods: string[],
  date: string,
  pp: number,
  missCount: number,
  maxCombo: number
}

export interface ApiScore {
  accuracy: number,
  build_id: string,
  ended_at: string,
  max_combo: number,
  mods: { acronym: string, settings: any }[],
  passed: boolean,
  rank: string,
  ruleset_id: number,
  started_at: number,
  statistics: { 
      great?: number,
      ok?: number,
      miss?: number,
  },
  total_score: number,
  user_id: number,
  best_id: number,
  id: number,
  legacy_perfect: false,
  pp: number,
  replay: boolean,
  current_user_attributes: {
      pin: boolean | null,
  },
  user: {
      avatar_url: string,
      country_code: string,
      default_group: string,
      id: number,
      is_active: boolean,
      is_bot: boolean,
      is_deleted: boolean,
      is_online: boolean,
      is_supporter: boolean,
      last_visit: string,
      pm_friends_only: boolean,
      profile_color: any,
      username: string,
      country: {
          code: string,
          name: string
      },
      cover: {
          custom_url: any,
          url: string
          id: string
      }
  }
}