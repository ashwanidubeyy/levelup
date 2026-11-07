import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { themeFontSize } from '../../theme/typography';

const Actions = styled.View`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
`;

const Card = styled.TouchableOpacity`
  margin-top: ${moderateVerticalScale(12, 0.9)}px;
  padding: ${moderateVerticalScale(16, 0.9)}px ${moderateScale(16, 0.9)}px;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  background-color: ${({ theme }) => theme.bento.surface};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
`;

const DateLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'XS')}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const Title = styled.Text`
  margin-top: ${moderateVerticalScale(6, 0.9)}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Description = styled.Text`
  margin-top: ${moderateVerticalScale(4, 0.9)}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_REGULAR};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  line-height: ${({ theme }) => themeFontSize(theme, 'SM') * 1.4}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

export const NotesStyles = {
  Actions,
  Card,
  DateLabel,
  Title,
  Description,
};
