import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText, rowBetween } from '../../utils/commonStyles';

const THUMB = moderateScale(64, 0.9);

const Container = styled.View<{ $accent: string }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${V_SPACING.MD}px;
  padding: ${V_SPACING.SM}px ${SPACING.SM}px;
  background-color: ${COLORS.PANEL};
  border-radius: ${RADIUS.MD}px;
  border-left-width: ${BORDER.THICK}px;
  border-left-color: ${({ $accent }) => $accent};
`;

const Thumb = styled.Image<{ $dim: boolean }>`
  width: ${THUMB}px;
  height: ${THUMB}px;
  border-radius: ${RADIUS.SM}px;
  opacity: ${({ $dim }) => ($dim ? 0.4 : 1)};
`;

const Body = styled.View`
  flex: 1;
  margin-left: ${SPACING.MD}px;
`;

const Title = styled.Text`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${COLORS.TEXT};
`;

const Description = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS}px;
`;

const Footer = styled.View`
  ${rowBetween}
  margin-top: ${V_SPACING.SM}px;
`;

const Xp = styled.Text<{ $negative: boolean }>`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.XS}px;
  color: ${({ $negative }) => ($negative ? COLORS.RED_BRIGHT : COLORS.GOLD)};
`;

export const QuestCardStyles = {
  Container,
  Thumb,
  Body,
  Title,
  Description,
  Footer,
  Xp,
};
