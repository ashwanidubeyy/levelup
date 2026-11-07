import type { ImageSourcePropType } from 'react-native';
import { ANIME_IMAGES } from '../constants/images';
import type { ThemeId } from './types';

export const THEME_BACKDROP_ART: Record<ThemeId, ImageSourcePropType[]> = {
  levelup: [
    ANIME_IMAGES.SOLO_LEVELING,
    ANIME_IMAGES.GOKU_ULTRA,
    ANIME_IMAGES.ZORO_BLADE,
    ANIME_IMAGES.LUFFY_WAR,
  ],
  onePiece: [
    ANIME_IMAGES.LUFFY_WAR,
    ANIME_IMAGES.LUFFY_SHANKS,
    ANIME_IMAGES.LUFFY_FREE,
    ANIME_IMAGES.ZORO_DRAGON,
    ANIME_IMAGES.ZORO_GRIN,
    ANIME_IMAGES.STRAW_HATS,
    ANIME_IMAGES.LAW,
    ANIME_IMAGES.ACE,
  ],
  naruto: [
    ANIME_IMAGES.NARUTO,
    ANIME_IMAGES.JIRAIYA,
    ANIME_IMAGES.SASUKE,
    ANIME_IMAGES.SASUKE_WIDE,
    ANIME_IMAGES.ITACHI,
    ANIME_IMAGES.ASL,
  ],
  soloLeveling: [
    ANIME_IMAGES.SOLO_LEVELING,
    ANIME_IMAGES.EXTRA_WP15699802_SOLO_LEVELING_HD_4K_WALLPAPERS,
    ANIME_IMAGES.ITACHI,
    ANIME_IMAGES.EXTRA_DEMON_01,
    ANIME_IMAGES.EXTRA_DEMON_02,
  ],
};

export const THEME_SCREEN_ASSETS: Record<
  ThemeId,
  {
    settingsBanner: ImageSourcePropType;
    statsBanner: ImageSourcePropType;
    journalBanner: ImageSourcePropType;
    questsBanner: ImageSourcePropType;
  }
> = {
  levelup: {
    settingsBanner: ANIME_IMAGES.LAW,
    statsBanner: ANIME_IMAGES.SASUKE_WIDE,
    journalBanner: ANIME_IMAGES.JIRAIYA,
    questsBanner: ANIME_IMAGES.GOKU_ULTRA,
  },
  onePiece: {
    settingsBanner: ANIME_IMAGES.STRAW_HATS,
    statsBanner: ANIME_IMAGES.ZORO_GRIN,
    journalBanner: ANIME_IMAGES.LUFFY_FREE,
    questsBanner: ANIME_IMAGES.ACE,
  },
  naruto: {
    settingsBanner: ANIME_IMAGES.JIRAIYA,
    statsBanner: ANIME_IMAGES.NARUTO,
    journalBanner: ANIME_IMAGES.SASUKE_WIDE,
    questsBanner: ANIME_IMAGES.ASL,
  },
  soloLeveling: {
    settingsBanner: ANIME_IMAGES.SOLO_LEVELING,
    statsBanner: ANIME_IMAGES.EXTRA_WP15699802_SOLO_LEVELING_HD_4K_WALLPAPERS,
    journalBanner: ANIME_IMAGES.ITACHI,
    questsBanner: ANIME_IMAGES.EXTRA_DEMON_01,
  },
};
