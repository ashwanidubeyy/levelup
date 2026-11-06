import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
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
  font-family: ${FONTS.DISPLAY_BLACK};
  font-size: ${FONT_SIZES.LG}px;
  color: ${COLORS.WHITE};
`;

const LevelText = styled.Text`
  margin-top: ${V_SPACING.XS}px;
  margin-bottom: ${V_SPACING.SM}px;
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.XS}px;
  color: ${COLORS.BLUE_LIGHT};
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
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.XXS}px;
  color: ${({ $active }) => ($active ? COLORS.BLUE_GLOW : COLORS.TEXT_DIM)};
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
