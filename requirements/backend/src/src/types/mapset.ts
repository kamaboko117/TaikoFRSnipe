export interface Covers {
  cover: string;
  'cover@2x': string;
  card: string;
  'card@2x': string;
  list: string;
  'list@2x': string;
  slimcover: string;
  'slimcover@2x': string;
}

export interface Availability {
  download_disabled: boolean;
  more_information?: any;
}

export interface NominationsSummary {
  current: number;
  required: number;
}

export interface Failtimes {
  fail: number[];
  exit: number[];
}

export interface Beatmap {
  beatmapset_id: number;
  difficulty_rating: number;
  id: number;
  mode: string;
  status: string;
  total_length: number;
  user_id: number;
  version: string;
  accuracy: number;
  ar: number;
  bpm: number;
  convert: boolean;
  count_circles: number;
  count_sliders: number;
  count_spinners: number;
  cs: number;
  deleted_at?: any;
  drain: number;
  hit_length: number;
  is_scoreable: boolean;
  last_updated: Date;
  mode_int: number;
  passcount: number;
  playcount: number;
  ranked: number;
  url: string;
  checksum: string;
  failtimes: Failtimes;
  max_combo: number;
}

export interface CurrentUserAttributes {
  can_beatmap_update_owner: boolean;
  can_delete: boolean;
  can_edit_metadata: boolean;
  can_edit_offset: boolean;
  can_hype: boolean;
  can_hype_reason?: any;
  can_love: boolean;
  can_remove_from_loved: boolean;
  is_watching: boolean;
  new_hype_time?: any;
  nomination_modes?: any;
  remaining_hype: number;
}

export interface Description {
  description: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Language {
  id: number;
  name: string;
}

export interface RecentFavourite {
  avatar_url: string;
  country_code: string;
  default_group: string;
  id: number;
  is_active: boolean;
  is_bot: boolean;
  is_deleted: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit?: Date;
  pm_friends_only: boolean;
  profile_colour?: any;
  username: string;
}

export interface User {
  avatar_url: string;
  country_code: string;
  default_group: string;
  id: number;
  is_active: boolean;
  is_bot: boolean;
  is_deleted: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit: Date;
  pm_friends_only: boolean;
  profile_colour: string;
  username: string;
}

export interface BeatmapData {
  id: number;
  version: string;
  drain: number;
  bpm: number;
  accuracy: number;
  difficulty_rating: number;
  total_length: number;
  mode: string;
}

export interface MapsetData {
  id: number;
  artist: string;
  title: string;
  creator: string;
  status: string;
  beatmaps: BeatmapData[];
}

export interface RootObject {
  artist: string;
  artist_unicode: string;
  covers: Covers;
  creator: string;
  favourite_count: number;
  hype?: any;
  id: number;
  nsfw: boolean;
  offset: number;
  play_count: number;
  preview_url: string;
  source: string;
  spotlight: boolean;
  status: string;
  title: string;
  title_unicode: string;
  track_id?: any;
  user_id: number;
  video: boolean;
  availability: Availability;
  bpm: number;
  can_be_hyped: boolean;
  discussion_enabled: boolean;
  discussion_locked: boolean;
  is_scoreable: boolean;
  last_updated: Date;
  legacy_thread_url: string;
  nominations_summary: NominationsSummary;
  ranked: number;
  ranked_date: Date;
  storyboard: boolean;
  submitted_date: Date;
  tags: string;
  has_favourited: boolean;
  beatmaps: Beatmap[];
  converts: any[];
  current_user_attributes: CurrentUserAttributes;
  description: Description;
  genre: Genre;
  language: Language;
  ratings: number[];
  recent_favourites: RecentFavourite[];
  user: User;
}
