import type { ReactNode } from 'react';
import type { ImageSourcePropType } from 'react-native';
import type { QuestStatus, RankId } from './quest.types';

export type PanelVariant = 'system' | 'danger' | 'monarch';

export type ButtonVariant = 'primary' | 'danger' | 'ghost';

export type ChipVariant = 'success' | 'warning' | 'danger' | 'info' | 'muted' | 'monarch';

export type HeroSize = 'tall' | 'medium' | 'short';

export interface PageContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  withTopInset?: boolean;
  withBottomInset?: boolean;
}

export interface SystemPanelProps {
  children: ReactNode;
  title?: string;
  rightLabel?: string;
  variant?: PanelVariant;
}

export interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  compact?: boolean;
  accessibilityLabel?: string;
}

export interface StatBarProps {
  progress: number;
  variant?: PanelVariant;
  thin?: boolean;
}

export interface RankBadgeProps {
  rank: RankId;
  image: ImageSourcePropType;
  size?: 'small' | 'large';
  active?: boolean;
}

export interface AnimeHeroCardProps {
  image: ImageSourcePropType;
  children?: ReactNode;
  size?: HeroSize;
}

export interface QuoteCardProps {
  text: string;
  author: string;
  image: ImageSourcePropType | null;
  title: string;
  hint?: string;
  onPress?: () => void;
}

export interface PermissionStepProps {
  title: string;
  description?: string;
  granted: boolean;
  statusLabel: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface ComingSoonCardProps {
  title: string;
  body: string;
  badge: string;
}

export interface LoaderProps {
  fullscreen?: boolean;
  label?: string;
}

export interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  maxLength?: number;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
}

export interface KeybordViewProps {
  children: ReactNode;
}

export interface GradientViewProps {
  colors: readonly string[];
  children?: ReactNode;
  fill?: boolean;
  horizontal?: boolean;
}

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  rightLabel?: string;
  onRightPress?: () => void;
}

export interface ToggleRowProps {
  label: string;
  hint?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export interface StatTileProps {
  label: string;
  value: string;
  accent?: PanelVariant;
}

export interface AppCountRowProps {
  label: string;
  count: number;
  max: number;
  caption?: string;
}

export interface QuestCardProps {
  title: string;
  description: string;
  xpLabel: string;
  statusLabel: string;
  status: QuestStatus;
  image: ImageSourcePropType;
  negative?: boolean;
}

export interface JournalEntryCardProps {
  title: string;
  preview: string;
  dateLabel: string;
  moodLabel: string;
  moodColor: string;
  onPress: () => void;
}

export interface SegmentOption {
  label: string;
  value: string;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
}

export interface BarDatum {
  key: string;
  label: string;
  value: number;
  muted: boolean;
}

export interface BarChartProps {
  data: BarDatum[];
  limit: number;
}

export interface StatusChipProps {
  label: string;
  variant: ChipVariant;
}

export interface EmptyStateProps {
  image: ImageSourcePropType;
  message: string;
}

export interface MoodOption {
  value: string;
  label: string;
  color: string;
}

export interface MoodSelectorProps {
  options: MoodOption[];
  value: string;
  onChange: (value: string) => void;
}

export interface StepperProps {
  label: string;
  valueLabel: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export interface InfoRowProps {
  label: string;
  value: string;
  emphasis?: PanelVariant;
}

export interface BannerProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: PanelVariant;
}

export interface NavRowProps {
  label: string;
  hint?: string;
  onPress: () => void;
}

export interface DateNavigatorProps {
  label: string;
  onPrevious: () => void;
  onNext: () => void;
  nextDisabled: boolean;
  previousLabel: string;
  nextLabel: string;
}

export interface HubTileProps {
  label: string;
  value: string;
  hint: string;
  accent?: PanelVariant;
  onPress: () => void;
}

export interface LevelCardProps {
  title: string;
  levelLabel: string;
  xpLabel: string;
  progress: number;
}

export interface MonthGridProps {
  weeks: Array<Array<string | null>>;
  weekdayLabels: string[];
  selected: string;
  today: string;
  marked: string[];
  onSelect: (day: string) => void;
}

export interface ChallengeCardProps {
  title: string;
  rangeLabel: string;
  progressLabel: string;
  progress: number;
  xpLabel: string;
  checkInLabel: string;
  deleteLabel: string;
  doneLabel: string;
  canCheckIn: boolean;
  completed: boolean;
  onCheckIn: () => void;
  onDelete: () => void;
}

export interface BulletListProps {
  items: string[];
  tone: 'allowed' | 'denied';
}

export interface OnboardingStepProps {
  image: ImageSourcePropType;
  stepLabel: string;
  title: string;
  body?: string;
  children?: ReactNode;
}

export interface TabIconProps {
  color: string;
  size: number;
}
