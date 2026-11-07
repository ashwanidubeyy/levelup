import type { ImageSourcePropType } from 'react-native';
import { HERO_ROTATION, QUOTE_FALLBACK_ART } from '../constants/images';
import type { QuoteEntry } from '../constants/quotes';
import { QUOTES } from '../constants/quotes';
import { dayOfYear } from './date';

export const generateId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const ratio = (value: number, max: number): number => (max > 0 ? clamp(value / max, 0, 1) : 0);

export const heroForToday = (): ImageSourcePropType =>
  HERO_ROTATION[dayOfYear(new Date()) % HERO_ROTATION.length];

export const quoteIndexForToday = (): number => dayOfYear(new Date()) % QUOTES.length;

const QUOTE_STRIDE = 97;

const greatestCommonDivisor = (a: number, b: number): number => (b === 0 ? a : greatestCommonDivisor(b, a % b));

const quoteStride = greatestCommonDivisor(QUOTE_STRIDE, QUOTES.length) === 1 ? QUOTE_STRIDE : 1;

const hashToIndex = (value: string, modulo: number): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return modulo > 0 ? hash % modulo : 0;
};

const fallbackArtForQuote = (id: string, pool: ImageSourcePropType[]): ImageSourcePropType =>
  pool[hashToIndex(id, pool.length)] ?? pool[0];

export const quoteAt = (index: number, artPool?: ImageSourcePropType[]): QuoteEntry => {
  const pool = artPool?.length ? artPool : QUOTE_FALLBACK_ART;
  const position = ((index % QUOTES.length) + QUOTES.length) % QUOTES.length;
  const entry = QUOTES[(position * quoteStride) % QUOTES.length];
  const image = entry.image ?? fallbackArtForQuote(entry.id, pool);
  return { ...entry, image };
};

export const previewText = (text: string, maxLength: number): string => {
  const collapsed = text?.replace(/\s+/g, ' ')?.trim() ?? '';
  return collapsed.length > maxLength ? `${collapsed.slice(0, maxLength - 1)}…` : collapsed;
};
