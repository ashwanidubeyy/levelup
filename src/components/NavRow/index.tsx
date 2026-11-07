import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from 'styled-components/native';
import type { NavRowProps } from '../../types';
import { NavRowStyles } from './styles';
import { Icons } from '../../assets/icons';
import type { AppTheme } from '../../theme/types';

const { ChevronRightIcon } = Icons;

const ICON_SIZE = moderateScale(20, 0.9);

const NavRow = ({ label, hint, onPress }: NavRowProps) => {
  const theme = useTheme() as AppTheme;
  return (
    <NavRowStyles.Touchable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <NavRowStyles.Texts>
        <NavRowStyles.Label>{label}</NavRowStyles.Label>
        {hint ? <NavRowStyles.Hint>{hint}</NavRowStyles.Hint> : null}
      </NavRowStyles.Texts>
      <ChevronRightIcon size={ICON_SIZE} color={theme.colors.BLUE_LIGHT} />
    </NavRowStyles.Touchable>
  );
};

export default NavRow;
