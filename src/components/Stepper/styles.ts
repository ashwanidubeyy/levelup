import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { bodyText } from '../../utils/commonStyles';

const BUTTON = moderateScale(38, 0.9);

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${V_SPACING.SM}px 0;
`;

const Label = styled.Text`
  ${bodyText}
  flex: 1;
`;

const Controls = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity<{ $disabled: boolean }>`
  width: ${BUTTON}px;
  height: ${BUTTON}px;
  align-items: center;
  justify-content: center;
  border-radius: ${RADIUS.SM}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ theme }) => theme.colors.BLUE};
  background-color: ${({ theme }) => theme.colors.BLUE_TINT};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
`;

const Value = styled.Text`
  min-width: ${moderateScale(92, 0.9)}px;
  text-align: center;
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ theme }) => theme.colors.TEXT};
  margin-left: ${SPACING.SM}px;
  margin-right: ${SPACING.SM}px;
`;

export const StepperStyles = {
  Container,
  Label,
  Controls,
  Button,
  Value,
};
