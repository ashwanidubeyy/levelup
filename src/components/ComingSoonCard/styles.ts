import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const Title = styled.Text`
  margin-top: ${V_SPACING.SM}px;
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.MD}px;
  color: ${COLORS.TEXT};
`;

const Body = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.SM}px;
  line-height: ${FONT_SIZES.SM * 1.4}px;
`;

export const ComingSoonCardStyles = {
  Title,
  Body,
};
