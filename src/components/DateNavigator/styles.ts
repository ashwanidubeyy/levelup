import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { V_SPACING } from '../../theme/spacing';
import { rowBetween } from '../../utils/commonStyles';

const HIT = moderateScale(40, 0.9);

const Container = styled.View`
  ${rowBetween}
  margin-top: ${V_SPACING.MD}px;
`;

const Arrow = styled.TouchableOpacity<{ $disabled: boolean }>`
  width: ${HIT}px;
  height: ${HIT}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
`;

const Label = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

export const DateNavigatorStyles = {
  Container,
  Arrow,
  Label,
};
