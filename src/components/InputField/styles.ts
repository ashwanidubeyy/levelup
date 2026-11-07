import styled from 'styled-components/native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { sectionTitleText } from '../../utils/commonStyles';

const SINGLE_HEIGHT = moderateVerticalScale(48, 0.9);
const MULTI_HEIGHT = moderateVerticalScale(220, 0.9);

const Container = styled.View`
  margin-top: ${V_SPACING.LG}px;
`;

const Label = styled.Text`
  ${sectionTitleText}
  margin-bottom: ${V_SPACING.SM}px;
`;

const Input = styled.TextInput<{ $multiline: boolean; $error: boolean }>`
  min-height: ${({ $multiline }) => ($multiline ? MULTI_HEIGHT : SINGLE_HEIGHT)}px;
  padding: ${V_SPACING.MD}px ${SPACING.MD}px;
  background-color: ${({ theme }) => theme.colors.PANEL};
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ $error, theme }) => ($error ? theme.colors.RED_BRIGHT : theme.colors.PANEL_BORDER)};
  font-family: ${FONTS.BODY_MEDIUM};
  font-size: ${FONT_SIZES.MD}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Error = styled.Text`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ theme }) => theme.colors.RED_BRIGHT};
`;

export const InputFieldStyles = {
  Container,
  Label,
  Input,
  Error,
};
