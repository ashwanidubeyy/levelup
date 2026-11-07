import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { SPACING, V_SPACING } from '../../theme/spacing';

const Wrap = styled.View`
  margin-top: ${V_SPACING.MD}px;
`;

const Display = styled.Text`
  color: ${COLORS.TEXT};
  font-size: ${moderateScale(24, 0.9)}px;
  font-weight: 700;
  text-align: right;
  padding-vertical: ${V_SPACING.SM}px;
`;

const Hint = styled.Text`
  color: ${COLORS.TEXT_DIM};
  font-size: ${moderateScale(12, 0.9)}px;
  margin-bottom: ${V_SPACING.SM}px;
`;

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${SPACING.XS}px;
`;

const Key = styled.TouchableOpacity<{ $wide?: boolean }>`
  width: ${(props: { $wide?: boolean }) => (props?.$wide ? `${scale(156)}px` : `${scale(74)}px`)};
  min-height: ${verticalScale(44)}px;
  border-radius: ${moderateScale(10, 0.9)}px;
  background-color: ${COLORS.PANEL};
  border-width: 1px;
  border-color: ${COLORS.PANEL_BORDER};
  align-items: center;
  justify-content: center;
`;

const KeyLabel = styled.Text`
  color: ${COLORS.TEXT};
  font-size: ${moderateScale(16, 0.9)}px;
  font-weight: 600;
`;

const Error = styled.Text`
  color: ${COLORS.RED_BRIGHT};
  font-size: ${moderateScale(12, 0.9)}px;
  margin-top: ${V_SPACING.XS}px;
`;

const Actions = styled.View`
  flex-direction: row;
  gap: ${SPACING.SM}px;
  margin-top: ${V_SPACING.SM}px;
`;

export const SpendCalculatorStyles = {
  Wrap,
  Display,
  Hint,
  Grid,
  Key,
  KeyLabel,
  Error,
  Actions,
};
