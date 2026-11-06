import type { ImageSourcePropType } from 'react-native';
import { ANIME_IMAGES } from './images';
import { quotesEn } from '../i18n/quotes.en';

export type QuoteId = keyof typeof quotesEn;

export interface QuoteEntry {
  id: QuoteId;
  textKey: string;
  authorKey: string;
  image: ImageSourcePropType | null;
}

const QUOTE_IMAGES: Partial<Record<QuoteId, ImageSourcePropType>> = {
  jinwoo: ANIME_IMAGES.SOLO_LEVELING,
  jinwooArise: ANIME_IMAGES.SOLO_LEVELING,
  goku: ANIME_IMAGES.GOKU_FIGHT,
  gokuHope: ANIME_IMAGES.GOKU_ULTRA,
  gokuMonkey: ANIME_IMAGES.GOKU_KID,
  gokuSuperSaiyan: ANIME_IMAGES.GOKU_FIGHT,
  vegetaPain: ANIME_IMAGES.GOKU_FIGHT,
  vegetaNumberOne: ANIME_IMAGES.GOKU_ULTRA,
  vegetaPrince: ANIME_IMAGES.GOKU_ULTRA,
  vegetaNineThousand: ANIME_IMAGES.GOKU_KID,
  luffy: ANIME_IMAGES.LUFFY_WAR,
  luffyChances: ANIME_IMAGES.LUFFY_FREE,
  luffyDeath: ANIME_IMAGES.LUFFY_WAR,
  luffyFreedom: ANIME_IMAGES.STRAW_HATS,
  luffyKing: ANIME_IMAGES.LUFFY_SHANKS,
  zoro: ANIME_IMAGES.ZORO_GRIN,
  zoroNothing: ANIME_IMAGES.ZORO_DRAGON,
  zoroScars: ANIME_IMAGES.ZORO_BLADE,
  zoroDream: ANIME_IMAGES.ZORO_GRIN,
  zoroCaptain: ANIME_IMAGES.ZORO_DRAGON,
  zoroFarthest: ANIME_IMAGES.ZORO_BLADE,
  shanks: ANIME_IMAGES.LUFFY_SHANKS,
  whitebeard: ANIME_IMAGES.ACE,
  ace: ANIME_IMAGES.ACE,
  roger: ANIME_IMAGES.STRAW_HATS,
  rogerTreasure: ANIME_IMAGES.LUFFY_FREE,
  hiluluk: ANIME_IMAGES.ASL,
  robin: ANIME_IMAGES.STRAW_HATS,
  naruto: ANIME_IMAGES.NARUTO,
  narutoBelieve: ANIME_IMAGES.NARUTO,
  narutoGiveUp: ANIME_IMAGES.NARUTO,
  narutoHokage: ANIME_IMAGES.NARUTO,
  rockLee: ANIME_IMAGES.NARUTO,
  itachi: ANIME_IMAGES.ITACHI,
  itachiSelf: ANIME_IMAGES.ITACHI,
  itachiReality: ANIME_IMAGES.ITACHI,
  itachiObstacle: ANIME_IMAGES.ITACHI,
  itachiAlways: ANIME_IMAGES.SASUKE_WIDE,
  sasuke: ANIME_IMAGES.SASUKE,
  sasukeAmbition: ANIME_IMAGES.SASUKE_WIDE,
  jiraiya: ANIME_IMAGES.JIRAIYA,
  jiraiyaHome: ANIME_IMAGES.JIRAIYA,
  jiraiyaShinobi: ANIME_IMAGES.JIRAIYA,
  kakashi: ANIME_IMAGES.NARUTO,
  pain: ANIME_IMAGES.SASUKE_WIDE,
  painKnow: ANIME_IMAGES.SASUKE,
  madara: ANIME_IMAGES.SASUKE,
  shikamaru: ANIME_IMAGES.NARUTO,
};

export const QUOTES: QuoteEntry[] = (Object.keys(quotesEn) as QuoteId[]).map((id: QuoteId) => ({
  id,
  textKey: `quotes.${id}.text`,
  authorKey: `quotes.${id}.author`,
  image: QUOTE_IMAGES[id] ?? null,
}));
