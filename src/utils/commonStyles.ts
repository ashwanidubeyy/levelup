import { css } from 'styled-components/native';
import { themeFontSize } from '../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../theme/spacing';

export const sectionTitleText = css`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XS')}px;
  letter-spacing: ${({ theme }) => theme.typography.displayLetterSpacing}px;
  color: ${({ theme }) => theme.colors.BLUE_LIGHT};
`;

export const bodyText = css`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  letter-spacing: ${({ theme }) => theme.typography.bodyLetterSpacing}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

export const mutedText = css`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  letter-spacing: ${({ theme }) => theme.typography.bodyLetterSpacing}px;
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
