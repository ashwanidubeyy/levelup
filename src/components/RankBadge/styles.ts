import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING } from '../../theme/spacing';

const LARGE = moderateScale(84, 0.9);
const SMALL = moderateScale(52, 0.9);

const sizeOf = (large: boolean) => (large ? LARGE : SMALL);

const Container = styled.View<{ $large: boolean; $active: boolean }>`
  width: ${({ $large }) => sizeOf($large)}px;
  height: ${({ $large }) => sizeOf($large)}px;
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.THICK}px;
  border-color: ${({ $active, theme }) => ($active ? theme.colors.BLUE_GLOW : theme.colors.PANEL_BORDER)};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.PANEL};
`;

const Portrait = styled.Image<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0.45)};
`;

const Letter = styled.Text<{ $large: boolean }>`
  position: absolute;
  bottom: ${SPACING.XXS}px;
  right: ${SPACING.XS}px;
  font-family: ${FONTS.DISPLAY_BLACK};
  font-size: ${({ $large }) => ($large ? FONT_SIZES.XL : FONT_SIZES.MD)}px;
  color: ${({ theme }) => theme.colors.WHITE};
  text-shadow-color: ${({ theme }) => theme.colors.BLUE_GLOW};
  text-shadow-radius: ${SPACING.SM}px;
`;

export const RankBadgeStyles = {
  Container,
  Portrait,
  Letter,
};
