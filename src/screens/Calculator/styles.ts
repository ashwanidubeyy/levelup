import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { themeFontSize } from '../../theme/typography';

const HistoryTitle = styled.Text`
  margin-top: ${moderateVerticalScale(22, 0.9)}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

const Empty = styled.Text`
  margin-top: ${moderateVerticalScale(10, 0.9)}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_REGULAR};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

const Row = styled.View`
  margin-top: ${moderateVerticalScale(10, 0.9)}px;
  padding: ${moderateVerticalScale(12, 0.9)}px ${moderateScale(14, 0.9)}px;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  background-color: ${({ theme }) => theme.bento.surface};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
`;

const Label = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Meta = styled.Text`
  margin-top: ${moderateVerticalScale(4, 0.9)}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_REGULAR};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

const Result = styled.Text`
  margin-top: ${moderateVerticalScale(4, 0.9)}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'LG')}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const Actions = styled.View`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  align-items: flex-start;
`;

export const CalculatorStyles = {
  HistoryTitle,
  Empty,
  Row,
  Label,
  Meta,
  Result,
  Actions,
};
