import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText, rowBetween } from '../../utils/commonStyles';

const THUMB = moderateScale(64, 0.9);

const Container = styled.View<{ $accent: string }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${V_SPACING.MD}px;
  padding: ${V_SPACING.SM}px ${SPACING.SM}px;
  background-color: ${({ theme }) => theme.colors.PANEL};
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
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT};
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
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XS')}px;
  color: ${({ $negative, theme }) => ($negative ? theme.colors.RED_BRIGHT : theme.colors.GOLD)};
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
