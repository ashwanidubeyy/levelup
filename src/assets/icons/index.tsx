import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { COLORS } from '../../theme/colors';

const DEFAULT_SIZE = 24;
const STROKE = 2;

const HomeIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z"
      stroke={props?.color ?? COLORS.TEXT}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
  </Svg>
);

const StatsIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} strokeLinecap="round" />
  </Svg>
);

const QuestIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14.5 3.5l6 6M4 20l9.5-9.5M17.5 6.5L9 15l-3 0 0-3 8.5-8.5M4 20l2-2"
      stroke={props?.color ?? COLORS.TEXT}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const JournalIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3V3z"
      stroke={props?.color ?? COLORS.TEXT}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
    <Path d="M9 8h6M9 12h6M5 18a3 3 0 0 1 3-3h11" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} strokeLinecap="round" />
  </Svg>
);

const SettingsIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} />
    <Path
      d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"
      stroke={props?.color ?? COLORS.TEXT}
      strokeWidth={STROKE * 0.8}
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronLeftIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path d="M15 5l-7 7 7 7" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronRightIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path d="M9 5l7 7-7 7" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PlusIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5v14M5 12h14" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} strokeLinecap="round" />
  </Svg>
);

const MinusIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12h14" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} strokeLinecap="round" />
  </Svg>
);

const CheckIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12.5l4.5 4.5L19 7.5" stroke={props?.color ?? COLORS.GREEN} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CrossIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path d="M6 6l12 12M18 6L6 18" stroke={props?.color ?? COLORS.RED_BRIGHT} strokeWidth={STROKE} strokeLinecap="round" />
  </Svg>
);

const LockIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="10" width="16" height="11" rx="2" stroke={props?.color ?? COLORS.TEXT_MUTED} strokeWidth={STROKE} />
    <Path d="M8 10V7a4 4 0 0 1 8 0v3" stroke={props?.color ?? COLORS.TEXT_MUTED} strokeWidth={STROKE} />
  </Svg>
);

const ShieldIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z"
      stroke={props?.color ?? COLORS.BLUE_LIGHT}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
  </Svg>
);

const EyeOffIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 3l18 18M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 9 6 9 6a16 16 0 0 1-2.6 3.2M6.6 6.6C4.4 8.1 3 12 3 12s4 6 9 6a8.6 8.6 0 0 0 4.4-1.2M9.9 9.9a3 3 0 0 0 4.2 4.2"
      stroke={props?.color ?? COLORS.RED_BRIGHT}
      strokeWidth={STROKE}
      strokeLinecap="round"
    />
  </Svg>
);

const BoltIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke={props?.color ?? COLORS.GOLD} strokeWidth={STROKE} strokeLinejoin="round" />
  </Svg>
);

const FocusIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="8" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} />
    <Path d="M12 8v5l3 2" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} strokeLinecap="round" />
  </Svg>
);

const ChallengeIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 4h9l3 3v13H6V4z"
      stroke={props?.color ?? COLORS.TEXT}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
    <Path d="M9 12l2 2 4-4" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} strokeLinecap="round" />
  </Svg>
);

const BudgetIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="6" width="18" height="12" rx="2" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} />
    <Path d="M3 10h18" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} />
  </Svg>
);

const CalendarIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="5" width="16" height="15" rx="2" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} />
    <Path d="M8 3v4M16 3v4M4 10h16" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} strokeLinecap="round" />
  </Svg>
);

const MoreIcon = (props: any) => (
  <Svg width={props?.size ?? DEFAULT_SIZE} height={props?.size ?? DEFAULT_SIZE} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="4" width="6" height="6" rx="1" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} />
    <Rect x="14" y="4" width="6" height="6" rx="1" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} />
    <Rect x="4" y="14" width="6" height="6" rx="1" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} />
    <Rect x="14" y="14" width="6" height="6" rx="1" stroke={props?.color ?? COLORS.TEXT} strokeWidth={STROKE} />
  </Svg>
);

export const Icons = {
  HomeIcon,
  StatsIcon,
  QuestIcon,
  JournalIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  CrossIcon,
  LockIcon,
  ShieldIcon,
  EyeOffIcon,
  BoltIcon,
  FocusIcon,
  ChallengeIcon,
  BudgetIcon,
  CalendarIcon,
  MoreIcon,
};
