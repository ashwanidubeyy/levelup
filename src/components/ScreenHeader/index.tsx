import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import type { ScreenHeaderProps } from '../../types';
import { ScreenHeaderStyles } from './styles';
import { Icons } from '../../assets/icons';
import { COLORS } from '../../theme/colors';

const { ChevronLeftIcon } = Icons;

const ICON_SIZE = moderateScale(26, 0.9);

const ScreenHeader = ({ title, subtitle, onBack, backLabel, rightLabel, onRightPress }: ScreenHeaderProps) => (
  <ScreenHeaderStyles.Container>
    {onBack ? (
      <ScreenHeaderStyles.BackButton onPress={onBack} accessibilityRole="button" accessibilityLabel={backLabel}>
        <ChevronLeftIcon size={ICON_SIZE} color={COLORS.BLUE_LIGHT} />
      </ScreenHeaderStyles.BackButton>
    ) : null}
    <ScreenHeaderStyles.Texts>
      <ScreenHeaderStyles.Title numberOfLines={1}>{title}</ScreenHeaderStyles.Title>
      {subtitle ? <ScreenHeaderStyles.Subtitle>{subtitle}</ScreenHeaderStyles.Subtitle> : null}
    </ScreenHeaderStyles.Texts>
    {rightLabel && onRightPress ? (
      <ScreenHeaderStyles.RightButton onPress={onRightPress} accessibilityRole="button">
        <ScreenHeaderStyles.RightLabel>{rightLabel?.toUpperCase()}</ScreenHeaderStyles.RightLabel>
      </ScreenHeaderStyles.RightButton>
    ) : null}
  </ScreenHeaderStyles.Container>
);

export default ScreenHeader;
