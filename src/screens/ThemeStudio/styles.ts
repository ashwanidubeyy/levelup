import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const Preview = styled.View`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  padding: ${moderateVerticalScale(16, 0.9)}px ${moderateScale(16, 0.9)}px;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  background-color: ${({ theme }) => theme.bento.surface};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
`;

const PreviewKicker = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(12, 0.9)}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const PreviewTitle = styled.Text`
  margin-top: ${moderateVerticalScale(6, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(22, 0.9)}px;
  color: ${({ theme }) => theme.bento.textPrimary};
`;

const Hint = styled.Text`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  margin-bottom: ${moderateVerticalScale(4, 0.9)}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${moderateScale(13, 0.9)}px;
  color: ${({ theme }) => theme.bento.textSecondary};
`;

const Reset = styled.View`
  margin-top: ${moderateVerticalScale(16, 0.9)}px;
`;

export const ThemeStudioStyles = {
  Preview,
  PreviewKicker,
  PreviewTitle,
  Hint,
  Reset,
};
