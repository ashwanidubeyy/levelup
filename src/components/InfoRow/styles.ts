import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${V_SPACING.SM}px 0;
  border-bottom-width: ${BORDER.HAIRLINE}px;
  border-bottom-color: ${COLORS.PANEL};
`;

const Label = styled.Text`
  ${mutedText}
  flex: 1;
  margin-right: ${SPACING.MD}px;
`;

const Value = styled.Text<{ $color: string }>`
  flex: 1;
  text-align: right;
  font-family: ${FONTS.BODY_BOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ $color }) => $color};
`;

export const InfoRowStyles = {
  Container,
  Label,
  Value,
};
