import styled from 'styled-components/native';
import { SPACING, V_SPACING } from '../../theme/spacing';
import { bodyText, mutedText } from '../../utils/commonStyles';

const Container = styled.View<{ $disabled: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${V_SPACING.SM}px 0;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const Texts = styled.View`
  flex: 1;
  margin-right: ${SPACING.MD}px;
`;

const Label = styled.Text`
  ${bodyText}
`;

const Hint = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS / 2}px;
`;

export const ToggleRowStyles = {
  Container,
  Texts,
  Label,
  Hint,
};
