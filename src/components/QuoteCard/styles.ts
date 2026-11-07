import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { themeFontSize } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { sectionTitleText } from '../../utils/commonStyles';

const THUMB = moderateScale(72, 0.9);
const THUMB_HERO_W = moderateScale(300, 0.9);
const THUMB_HERO_H = moderateScale(152, 0.9);

const Container = styled.TouchableOpacity<{ $variant: 'default' | 'hero' }>`
  flex-direction: ${({ $variant }) => ($variant === 'hero' ? 'column' : 'row')};
  align-items: ${({ $variant }) => ($variant === 'hero' ? 'stretch' : 'center')};
  padding: ${V_SPACING.MD}px ${SPACING.MD}px;
  background-color: ${({ theme }) => theme.colors.PANEL_ALT};
  border-left-width: ${BORDER.THICK}px;
  border-left-color: ${({ theme }) => theme.colors.RED_BRIGHT};
  border-radius: ${RADIUS.MD}px;
  overflow: hidden;
`;

const Thumb = styled.Image<{ $variant: 'default' | 'hero' }>`
  width: ${({ $variant }) => ($variant === 'hero' ? THUMB_HERO_W : THUMB)}px;
  height: ${({ $variant }) => ($variant === 'hero' ? THUMB_HERO_H : THUMB)}px;
  border-radius: ${RADIUS.MD}px;
  align-self: ${({ $variant }) => ($variant === 'hero' ? 'center' : 'auto')};
`;

const Placeholder = styled.View<{ $variant: 'default' | 'hero' }>`
  width: ${({ $variant }) => ($variant === 'hero' ? THUMB_HERO_W : THUMB)}px;
  height: ${({ $variant }) => ($variant === 'hero' ? THUMB_HERO_H : THUMB)}px;
  border-radius: ${RADIUS.MD}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  align-self: ${({ $variant }) => ($variant === 'hero' ? 'center' : 'auto')};
`;

const Body = styled.View<{ $variant: 'default' | 'hero' }>`
  flex: 1;
  margin-left: ${({ $variant }) => ($variant === 'hero' ? 0 : SPACING.MD)}px;
  margin-top: ${({ $variant }) => ($variant === 'hero' ? V_SPACING.MD : 0)}px;
`;

const Title = styled.Text`
  ${sectionTitleText}
  color: ${({ theme }) => theme.colors.RED_BRIGHT};
`;

const Quote = styled.Text<{ $variant: 'default' | 'hero' }>`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ $variant, theme }) => ($variant === 'hero' ? themeFontSize(theme, 'LG') : themeFontSize(theme, 'MD'))}px;
  line-height: ${({ $variant, theme }) =>
    ($variant === 'hero' ? themeFontSize(theme, 'LG') : themeFontSize(theme, 'MD')) *
    theme.typography.lineHeightScale *
    ($variant === 'hero' ? 1.25 : 1.2)}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Author = styled.Text`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  letter-spacing: ${SPACING.XXS}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

const Hint = styled.Text`
  margin-top: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  color: ${({ theme }) => theme.colors.TEXT_DIM};
`;

export const QuoteCardStyles = {
  Hint,
  Placeholder,
  Container,
  Thumb,
  Body,
  Title,
  Quote,
  Author,
};
