import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import type { PanelVariant } from '../../types';
import { accentFor, tintFor } from '../../utils/variant';

const Container = styled.View<{ $variant: PanelVariant }>`
  margin-top: ${V_SPACING.LG}px;
  flex-direction: row;
  align-items: center;
  padding: ${V_SPACING.MD}px ${SPACING.MD}px;
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ $variant, theme }) => theme.accents[$variant]};
  background-color: ${({ $variant }) => tintFor($variant)};
`;

const Message = styled.Text`
  flex: 1;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Action = styled.View`
  margin-left: ${SPACING.MD}px;
`;

export const BannerStyles = {
  Container,
  Message,
  Action,
};
