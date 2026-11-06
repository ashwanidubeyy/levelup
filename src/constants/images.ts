import type { ImageSourcePropType } from 'react-native';

const BASE_ANIME_IMAGES = {
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

const EXTRA_POOL_ANIME_IMAGES = {
  EXTRA_BLACK_CLOVER_01: require('../assets/Images/anime/extra_black_clover_01.webp'),
  EXTRA_DEMON_01: require('../assets/Images/anime/extra_demon_01.webp'),
  EXTRA_DEMON_02: require('../assets/Images/anime/extra_demon_02.jpg'),
  EXTRA_GEAR_5_LAUGHTER_SEQUENCE: require('../assets/Images/anime/extra_gear_5_laughter_sequence.gif'),
  EXTRA_ITACHI_01: require('../assets/Images/anime/extra_itachi_01.jpg'),
  EXTRA_NARUTO_02: require('../assets/Images/anime/extra_naruto_02.webp'),
  EXTRA_UWP5058968: require('../assets/Images/anime/extra_uwp5058968.jpeg'),
  EXTRA_UWP5116034: require('../assets/Images/anime/extra_uwp5116034.jpeg'),
  EXTRA_UWP5116067: require('../assets/Images/anime/extra_uwp5116067.jpeg'),
  EXTRA_UWP5116130: require('../assets/Images/anime/extra_uwp5116130.jpeg'),
  EXTRA_UWP5116252: require('../assets/Images/anime/extra_uwp5116252.jpeg'),
  EXTRA_UWP5116498: require('../assets/Images/anime/extra_uwp5116498.jpeg'),
  EXTRA_UWP5116860: require('../assets/Images/anime/extra_uwp5116860.jpeg'),
  EXTRA_UWP5116936: require('../assets/Images/anime/extra_uwp5116936.jpeg'),
  EXTRA_UWP5117136: require('../assets/Images/anime/extra_uwp5117136.jpeg'),
  EXTRA_UWP5117137: require('../assets/Images/anime/extra_uwp5117137.jpeg'),
  EXTRA_UWP5117400: require('../assets/Images/anime/extra_uwp5117400.png'),
  EXTRA_UWP5117483: require('../assets/Images/anime/extra_uwp5117483.jpeg'),
  EXTRA_UWP5117736: require('../assets/Images/anime/extra_uwp5117736.jpeg'),
  EXTRA_UWP5117743: require('../assets/Images/anime/extra_uwp5117743.jpeg'),
  EXTRA_UWP5117975: require('../assets/Images/anime/extra_uwp5117975.jpeg'),
  EXTRA_UWP5118315: require('../assets/Images/anime/extra_uwp5118315.gif'),
  EXTRA_UWP5120097: require('../assets/Images/anime/extra_uwp5120097.jpeg'),
  EXTRA_UWP_01: require('../assets/Images/anime/extra_uwp_01.jpg'),
  EXTRA_WP12511966_DEMON_SLAYER_WALLPAPERS: require('../assets/Images/anime/extra_wp12511966-demon-slayer-wallpapers.jpg'),
  EXTRA_WP12701891_GEAR_5_LUFFY_WALLPAPERS: require('../assets/Images/anime/extra_wp12701891-gear-5-luffy-wallpapers.jpg'),
  EXTRA_WP13134408_BLACK_CLOVER_WALLPAPERS: require('../assets/Images/anime/extra_wp13134408-black-clover-wallpapers.jpg'),
  EXTRA_WP13788587_ITACHI_HD_MOBILE_WALLPAPERS: require('../assets/Images/anime/extra_wp13788587-itachi-hd-mobile-wallpapers.jpg'),
  EXTRA_WP13844240_BLACK_CLOVER_WALLPAPERS: require('../assets/Images/anime/extra_wp13844240-black-clover-wallpapers.jpg'),
  EXTRA_WP14009055_BLACK_CLOVER_WALLPAPERS: require('../assets/Images/anime/extra_wp14009055-black-clover-wallpapers.jpg'),
  EXTRA_WP14630166_DEMON_SLAYER_WALLPAPERS: require('../assets/Images/anime/extra_wp14630166-demon-slayer-wallpapers.jpg'),
  EXTRA_WP14650621_ZORO_MOBILE_HD_WALLPAPERS: require('../assets/Images/anime/extra_wp14650621-zoro-mobile-hd-wallpapers.jpg'),
  EXTRA_WP14809787_ZORO_MOBILE_HD_WALLPAPERS: require('../assets/Images/anime/extra_wp14809787-zoro-mobile-hd-wallpapers.jpg'),
  EXTRA_WP14812486_BLACK_CLOVER_WALLPAPERS: require('../assets/Images/anime/extra_wp14812486-black-clover-wallpapers.webp'),
  EXTRA_WP14831678_DEMON_SLAYER_WALLPAPERS: require('../assets/Images/anime/extra_wp14831678-demon-slayer-wallpapers.webp'),
  EXTRA_WP15238958_NARUTO_ANIME_MOBILE_WALLPAPERS: require('../assets/Images/anime/extra_wp15238958-naruto-anime-mobile-wallpapers.webp'),
  EXTRA_WP15262889_NARUTO_ANIME_MOBILE_WALLPAPERS: require('../assets/Images/anime/extra_wp15262889-naruto-anime-mobile-wallpapers.jpg'),
  EXTRA_WP15699802_SOLO_LEVELING_HD_4K_WALLPAPERS: require('../assets/Images/anime/extra_wp15699802-solo-leveling-hd-4k-wallpapers.jpg'),
  EXTRA_WP16516179_ZORO_MOBILE_HD_WALLPAPERS: require('../assets/Images/anime/extra_wp16516179-zoro-mobile-hd-wallpapers.jpg'),
  EXTRA_WP2255592_BLACK_CLOVER_WALLPAPERS: require('../assets/Images/anime/extra_wp2255592-black-clover-wallpapers.jpg'),
  EXTRA_WP2690420_GOKU_MOBILE_WALLPAPERS: require('../assets/Images/anime/extra_wp2690420-goku-mobile-wallpapers.png'),
  EXTRA_WP2832411_ONE_PIECE_MOBILE_WALLPAPER: require('../assets/Images/anime/extra_wp2832411-one-piece-mobile-wallpaper.jpg'),
  EXTRA_WP4445555_DEMON_SLAYER_WALLPAPERS: require('../assets/Images/anime/extra_wp4445555-demon-slayer-wallpapers.jpg'),
  EXTRA_WP4445577_DEMON_SLAYER_WALLPAPERS: require('../assets/Images/anime/extra_wp4445577-demon-slayer-wallpapers.png'),
  EXTRA_WP4451844_LUFFY_SUPREME_WALLPAPERS: require('../assets/Images/anime/extra_wp4451844-luffy-supreme-wallpapers.jpg'),
  EXTRA_WP4616636_GOKU_MOBILE_WALLPAPERS: require('../assets/Images/anime/extra_wp4616636-goku-mobile-wallpapers.jpg'),
  EXTRA_WP4855635_MONKEY_D_LUFFY_IPHONE_WALLPAPERS: require('../assets/Images/anime/extra_wp4855635-monkey-d-luffy-iphone-wallpapers.jpg'),
  EXTRA_WP4855642_MONKEY_D_LUFFY_IPHONE_WALLPAPERS: require('../assets/Images/anime/extra_wp4855642-monkey-d-luffy-iphone-wallpapers.jpg'),
  EXTRA_WP4855645_ONE_PIECE_MOBILE_4K_WALLPAPERS: require('../assets/Images/anime/extra_wp4855645-one-piece-mobile-4k-wallpapers.jpg'),
  EXTRA_WP5354202_GOKU_MOBILE_WALLPAPERS: require('../assets/Images/anime/extra_wp5354202-goku-mobile-wallpapers.jpg'),
  EXTRA_WP6673791_ONE_PIECE_MOBILE_4K_WALLPAPERS: require('../assets/Images/anime/extra_wp6673791-one-piece-mobile-4k-wallpapers.jpg'),
  EXTRA_WP9322183_BLACK_CLOVER_WALLPAPERS: require('../assets/Images/anime/extra_wp9322183-black-clover-wallpapers.jpg'),
  EXTRA_WP9358075_ONE_PIECE_MOBILE_4K_WALLPAPERS: require('../assets/Images/anime/extra_wp9358075-one-piece-mobile-4k-wallpapers.jpg'),
} as const;

export const ANIME_IMAGES = { ...BASE_ANIME_IMAGES, ...EXTRA_POOL_ANIME_IMAGES } as const;

const ALL_ANIME_ART: ImageSourcePropType[] = Object.values(ANIME_IMAGES);

export const QUOTE_FALLBACK_ART: ImageSourcePropType[] = ALL_ANIME_ART;

export const LOADER_GIF: ImageSourcePropType = require('../assets/Images/loader.gif');

export const HERO_ROTATION: ImageSourcePropType[] = ALL_ANIME_ART;

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
