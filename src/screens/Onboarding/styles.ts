import styled from 'styled-components/native';
import { SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText, sectionTitleText } from '../../utils/commonStyles';

const Actions = styled.View`
  flex-direction: row;
  margin-top: ${V_SPACING.XL}px;
`;

const ActionSlot = styled.View<{ $grow: boolean }>`
  ${({ $grow }) => ($grow ? 'flex: 1;' : '')}
  margin-right: ${({ $grow }) => ($grow ? 0 : SPACING.MD)}px;
`;

const Section = styled.View``;

const SectionTitle = styled.Text`
  ${sectionTitleText}
  margin-top: ${V_SPACING.LG}px;
`;

const Note = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.MD}px;
  line-height: ${V_SPACING.LG * 1.2}px;
`;

export const OnboardingStyles = {
  Actions,
  ActionSlot,
  Section,
  SectionTitle,
  Note,
};
