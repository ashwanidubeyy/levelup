import styled from 'styled-components/native';
import {themeFontSize} from '../../theme/typography';
import { V_SPACING } from '../../theme/spacing';
import { bodyText, mutedText } from '../../utils/commonStyles';

const FieldLabel = styled.Text`
  ${bodyText}
  margin-top: ${V_SPACING.MD}px;
`;

const Hint = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS / 2}px;
`;

const Paragraph = styled.Text`
  ${mutedText}
  line-height: ${({ theme }) => themeFontSize(theme, 'SM') * 1.45}px;
`;

export const SettingsStyles = {
  FieldLabel,
  Hint,
  Paragraph,
};
