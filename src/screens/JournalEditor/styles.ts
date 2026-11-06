import styled from 'styled-components/native';
import { V_SPACING } from '../../theme/spacing';
import { sectionTitleText } from '../../utils/commonStyles';

const MoodLabel = styled.Text`
  ${sectionTitleText}
  margin-top: ${V_SPACING.LG}px;
`;

const Actions = styled.View`
  margin-top: ${V_SPACING.XL}px;
`;

export const JournalEditorStyles = {
  MoodLabel,
  Actions,
};
