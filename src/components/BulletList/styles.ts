import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
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
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  line-height: ${({ theme }) => themeFontSize(theme, 'MD') * 1.3}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

export const BulletListStyles = {
  Container,
  Item,
  Text,
};
