import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';

const Container = styled.View``;

const Item = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: ${V_SPACING.SM}px;
`;

const Text = styled.Text`
  flex: 1;
  margin-left: ${SPACING.SM}px;
  font-family: ${FONTS.BODY_MEDIUM};
  font-size: ${FONT_SIZES.MD}px;
  line-height: ${FONT_SIZES.MD * 1.3}px;
  color: ${COLORS.TEXT};
`;

export const BulletListStyles = {
  Container,
  Item,
  Text,
};
