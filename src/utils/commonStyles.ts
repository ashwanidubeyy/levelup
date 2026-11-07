import { css } from 'styled-components/native';
import { FONTS, FONT_SIZES } from '../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../theme/spacing';

export const sectionTitleText = css`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.XS}px;
  letter-spacing: ${SPACING.XXS}px;
  color: ${({ theme }) => theme.colors.BLUE_LIGHT};
`;

export const bodyText = css`
  font-family: ${FONTS.BODY_MEDIUM};
  font-size: ${FONT_SIZES.MD}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

export const mutedText = css`
  font-family: ${FONTS.BODY_MEDIUM};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

export const panelSurface = css`
  background-color: ${({ theme }) => theme.colors.PANEL};
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ theme }) => theme.colors.PANEL_BORDER};
  border-radius: ${RADIUS.LG}px;
`;

export const rowBetween = css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const sectionGap = css`
  margin-top: ${V_SPACING.LG}px;
`;
