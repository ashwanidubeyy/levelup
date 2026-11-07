import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { themeFontSize } from '../../theme/typography';
import { V_SPACING } from '../../theme/spacing';

const Page = styled.View`
  flex: 1;
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  padding: ${moderateVerticalScale(22, 0.9)}px ${moderateScale(20, 0.9)}px;
  background-color: ${({ theme }) => theme.bento.surface};
  border-radius: ${moderateScale(4, 0.9)}px;
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
  border-left-width: ${moderateScale(4, 0.9)}px;
  border-left-color: ${({ theme }) => theme.bento.accent};
`;

const Stamp = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const LegacyTitle = styled.Text`
  margin-top: ${moderateVerticalScale(14, 0.9)}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'LG')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const PageInput = styled.TextInput`
  flex: 1;
  margin-top: ${moderateVerticalScale(16, 0.9)}px;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_REGULAR};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  line-height: ${({ theme }) => themeFontSize(theme, 'MD') * 1.55}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Error = styled.Text`
  margin-top: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.RED_BRIGHT};
`;

const Actions = styled.View`
  padding-top: ${V_SPACING.MD}px;
`;

export const JournalEditorStyles = {
  Page,
  Stamp,
  LegacyTitle,
  PageInput,
  Error,
  Actions,
};
