import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const LevelRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LevelInfo = styled.View`
  flex: 1;
  margin-left: ${SPACING.MD}px;
`;

const RankName = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BLACK};
  font-size: ${({ theme }) => themeFontSize(theme, 'LG')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const LevelText = styled.Text`
  margin-top: ${V_SPACING.XS}px;
  margin-bottom: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XS')}px;
  color: ${({ theme }) => theme.colors.BLUE_LIGHT};
`;

const Note = styled.Text`
  ${mutedText}
  margin-bottom: ${V_SPACING.SM}px;
`;

const Ladder = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Rung = styled.View`
  align-items: center;
`;

const RungLabel = styled.Text<{ $active: boolean }>`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  color: ${({ $active, theme }) => ($active ? theme.colors.BLUE_GLOW : theme.colors.TEXT_DIM)};
`;

export const QuestsStyles = {
  LevelRow,
  LevelInfo,
  RankName,
  LevelText,
  Note,
  Ladder,
  Rung,
  RungLabel,
};
