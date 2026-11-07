import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const Note = styled.Text`
  ${mutedText}
  margin-bottom: ${V_SPACING.SM}px;
`;

const Actions = styled.View`
  flex-direction: row;
  margin-top: ${V_SPACING.LG}px;
  gap: ${SPACING.MD}px;
`;

const LogItem = styled.View`
  padding: ${V_SPACING.SM}px 0;
  border-bottom-width: ${BORDER.HAIRLINE}px;
  border-bottom-color: ${({ theme }) => theme.colors.PANEL};
`;

const LogHeader = styled.Text`
  font-family: ${FONTS.DISPLAY_MEDIUM};
  font-size: ${FONT_SIZES.XXS}px;
  color: ${({ theme }) => theme.colors.BLUE_LIGHT};
`;

const LogDetail = styled.Text`
  margin-top: ${V_SPACING.XS / 2}px;
  font-family: ${FONTS.BODY_MEDIUM};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

export const DiagnosticsStyles = {
  Note,
  Actions,
  LogItem,
  LogHeader,
  LogDetail,
};
