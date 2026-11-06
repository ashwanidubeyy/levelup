import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING } from '../../theme/spacing';
import type { ButtonVariant } from '../../types';
import { accentFor } from '../../utils/variant';

const HEIGHT = moderateVerticalScale(50, 0.9);
const COMPACT_HEIGHT = moderateVerticalScale(36, 0.9);

const ghostBorder = (variant: ButtonVariant) =>
  variant === 'ghost' ? accentFor('system') : COLORS.TRANSPARENT;

const Touchable = styled.TouchableOpacity<{ $disabled: boolean; $compact: boolean }>`
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  ${({ $compact }) => ($compact ? 'align-self: flex-start;' : '')}
`;

const Gradient = styled(LinearGradient)<{ $variant: ButtonVariant; $compact: boolean }>`
  height: ${({ $compact }) => ($compact ? COMPACT_HEIGHT : HEIGHT)}px;
  padding-left: ${({ $compact }) => ($compact ? SPACING.LG : SPACING.XL)}px;
  padding-right: ${({ $compact }) => ($compact ? SPACING.LG : SPACING.XL)}px;
  border-radius: ${RADIUS.SM}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ $variant }) => ghostBorder($variant)};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text<{ $compact: boolean }>`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${({ $compact }) => ($compact ? FONT_SIZES.XXS : FONT_SIZES.SM)}px;
  letter-spacing: ${SPACING.XXS}px;
  color: ${COLORS.WHITE};
`;

const LoaderSlot = styled.View`
  margin-right: ${SPACING.SM}px;
`;

export const PrimaryButtonStyles = {
  Touchable,
  Gradient,
  Label,
  LoaderSlot,
};
