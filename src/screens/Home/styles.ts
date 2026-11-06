import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText, sectionTitleText } from '../../utils/commonStyles';

const PlayerRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PlayerInfo = styled.View`
  flex: 1;
  margin-left: ${SPACING.MD}px;
`;

const PlayerLabel = styled.Text`
  ${sectionTitleText}
`;

const RankName = styled.Text`
  margin-top: ${V_SPACING.XS / 2}px;
  font-family: ${FONTS.DISPLAY_BLACK};
  font-size: ${FONT_SIZES.LG}px;
  color: ${COLORS.WHITE};
`;

const LevelRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${V_SPACING.XS}px;
  margin-bottom: ${V_SPACING.XS}px;
`;

const LevelText = styled.Text`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.XS}px;
  color: ${COLORS.BLUE_LIGHT};
`;

const XpText = styled.Text`
  ${mutedText}
`;

const CountRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const Count = styled.Text<{ $danger: boolean }>`
  font-family: ${FONTS.DISPLAY_BLACK};
  font-size: ${FONT_SIZES.GIANT}px;
  line-height: ${FONT_SIZES.GIANT * 1.1}px;
  color: ${({ $danger }) => ($danger ? COLORS.RED_BRIGHT : COLORS.WHITE)};
`;

const Limit = styled.Text`
  margin-left: ${SPACING.SM}px;
  margin-bottom: ${V_SPACING.SM}px;
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.LG}px;
  color: ${COLORS.TEXT_MUTED};
`;

const Message = styled.Text<{ $danger: boolean }>`
  margin-top: ${V_SPACING.SM}px;
  margin-bottom: ${V_SPACING.MD}px;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.MD}px;
  color: ${({ $danger }) => ($danger ? COLORS.RED_BRIGHT : COLORS.TEXT)};
`;

const Live = styled.Text<{ $active: boolean }>`
  ${mutedText}
  margin-top: ${V_SPACING.MD}px;
  color: ${({ $active }) => ($active ? COLORS.BLUE_GLOW : COLORS.TEXT_MUTED)};
`;

const Tiles = styled.View`
  flex-direction: row;
  margin-top: ${V_SPACING.LG}px;
  margin-bottom: ${V_SPACING.LG}px;
  gap: ${SPACING.MD}px;
`;

export const HomeStyles = {
  PlayerRow,
  PlayerInfo,
  PlayerLabel,
  RankName,
  LevelRow,
  LevelText,
  XpText,
  CountRow,
  Count,
  Limit,
  Message,
  Live,
  Tiles,
};
