import type { ImageSourcePropType } from 'react-native';

export const ANIME_IMAGES = {
  SOLO_LEVELING: require('../assets/Images/anime/solo_leveling_01.webp'),
  GOKU_KID: require('../assets/Images/anime/goku_01.webp'),
  GOKU_ULTRA: require('../assets/Images/anime/goku_02.webp'),
  GOKU_FIGHT: require('../assets/Images/anime/goku_03.webp'),
  ITACHI: require('../assets/Images/anime/itachi_01.webp'),
  NARUTO: require('../assets/Images/anime/naruto_01.webp'),
  JIRAIYA: require('../assets/Images/anime/jiraiya_01.webp'),
  SASUKE: require('../assets/Images/anime/sasuke_01.webp'),
  SASUKE_WIDE: require('../assets/Images/anime/sasuke_wide.webp'),
  ZORO_DRAGON: require('../assets/Images/anime/zoro_01.webp'),
  ZORO_GRIN: require('../assets/Images/anime/zoro_02.webp'),
  ZORO_BLADE: require('../assets/Images/anime/zoro_03.webp'),
  LUFFY_WAR: require('../assets/Images/anime/luffy_01.webp'),
  LUFFY_SHANKS: require('../assets/Images/anime/luffy_02.webp'),
  LUFFY_FREE: require('../assets/Images/anime/luffy_03.webp'),
  ASL: require('../assets/Images/anime/asl_01.webp'),
  STRAW_HATS: require('../assets/Images/anime/straw_hats_01.webp'),
  LAW: require('../assets/Images/anime/law_01.webp'),
  ACE: require('../assets/Images/anime/ace_01.webp'),
} as const;

export const LOADER_GIF: ImageSourcePropType = require('../assets/Images/loader.gif');

export const HERO_ROTATION: ImageSourcePropType[] = [
  ANIME_IMAGES.SOLO_LEVELING,
  ANIME_IMAGES.SASUKE,
  ANIME_IMAGES.ZORO_BLADE,
  ANIME_IMAGES.GOKU_FIGHT,
  ANIME_IMAGES.ITACHI,
  ANIME_IMAGES.LAW,
  ANIME_IMAGES.NARUTO,
  ANIME_IMAGES.LUFFY_WAR,
  ANIME_IMAGES.ZORO_DRAGON,
  ANIME_IMAGES.ACE,
  ANIME_IMAGES.GOKU_ULTRA,
  ANIME_IMAGES.LUFFY_SHANKS,
];

export const SCREEN_IMAGES = {
  ONBOARDING_WELCOME: ANIME_IMAGES.SOLO_LEVELING,
  ONBOARDING_PRIVACY: ANIME_IMAGES.ITACHI,
  ONBOARDING_ACCESSIBILITY: ANIME_IMAGES.GOKU_ULTRA,
  ONBOARDING_OVERLAY: ANIME_IMAGES.ZORO_BLADE,
  ONBOARDING_BATTERY: ANIME_IMAGES.LUFFY_WAR,
  ONBOARDING_LIMIT: ANIME_IMAGES.NARUTO,
  ONBOARDING_IOS: ANIME_IMAGES.SASUKE,
  ONBOARDING_DONE: ANIME_IMAGES.SOLO_LEVELING,
  STATS_BANNER: ANIME_IMAGES.SASUKE_WIDE,
  QUESTS_BANNER: ANIME_IMAGES.GOKU_ULTRA,
  JOURNAL_BANNER: ANIME_IMAGES.JIRAIYA,
  JOURNAL_EMPTY: ANIME_IMAGES.LUFFY_FREE,
  SETTINGS_BANNER: ANIME_IMAGES.LAW,
  DIAGNOSTICS_BANNER: ANIME_IMAGES.ZORO_GRIN,
  STATS_EMPTY: ANIME_IMAGES.STRAW_HATS,
  QUEST_LOG_EMPTY: ANIME_IMAGES.ASL,
} as const;

export const ONBOARDING_IMAGES: Record<string, ImageSourcePropType> = {
  welcome: SCREEN_IMAGES.ONBOARDING_WELCOME,
  privacy: SCREEN_IMAGES.ONBOARDING_PRIVACY,
  accessibility: SCREEN_IMAGES.ONBOARDING_ACCESSIBILITY,
  overlay: SCREEN_IMAGES.ONBOARDING_OVERLAY,
  battery: SCREEN_IMAGES.ONBOARDING_BATTERY,
  limit: SCREEN_IMAGES.ONBOARDING_LIMIT,
  ios: SCREEN_IMAGES.ONBOARDING_IOS,
  done: SCREEN_IMAGES.ONBOARDING_DONE,
};
