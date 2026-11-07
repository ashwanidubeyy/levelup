import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import type { PanelVariant } from '../../types';

const CORNER = moderateScale(14, 0.9);

const Container = styled.View<{ $variant: PanelVariant }>`
  margin-top: ${V_SPACING.LG}px;
  padding: ${V_SPACING.LG}px ${SPACING.LG}px;
  background-color: ${({ theme }) => theme.colors.PANEL_ALT};
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ theme }) => theme.colors.PANEL_BORDER};
  border-radius: ${RADIUS.MD}px;
  overflow: hidden;
`;

const TopGlow = styled.View<{ $variant: PanelVariant }>`
  position: absolute;
  top: 0;
  left: ${SPACING.XL}px;
  right: ${SPACING.XL}px;
  height: ${BORDER.THICK}px;
  background-color: ${({ $variant, theme }) => theme.accents[$variant]};
`;

const CornerTopLeft = styled.View<{ $variant: PanelVariant }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${CORNER}px;
  height: ${CORNER}px;
  border-top-width: ${BORDER.THICK}px;
  border-left-width: ${BORDER.THICK}px;
  border-color: ${({ $variant, theme }) => theme.accents[$variant]};
  border-top-left-radius: ${RADIUS.MD}px;
`;

const CornerBottomRight = styled.View<{ $variant: PanelVariant }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${CORNER}px;
  height: ${CORNER}px;
  border-bottom-width: ${BORDER.THICK}px;
  border-right-width: ${BORDER.THICK}px;
  border-color: ${({ $variant, theme }) => theme.accents[$variant]};
  border-bottom-right-radius: ${RADIUS.MD}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${V_SPACING.MD}px;
`;

const Title = styled.Text<{ $variant: PanelVariant }>`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.XS}px;
  letter-spacing: ${SPACING.XXS}px;
  color: ${({ $variant, theme }) => theme.accents[$variant]};
`;

const RightLabel = styled.Text`
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

export const SystemPanelStyles = {
  Container,
  TopGlow,
  CornerTopLeft,
  CornerBottomRight,
  Header,
  Title,
  RightLabel,
};
