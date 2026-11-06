import styled from 'styled-components/native';
import { SPACING, V_SPACING } from '../../theme/spacing';
import { bodyText, mutedText } from '../../utils/commonStyles';

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${V_SPACING.MD}px 0;
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

export const NavRowStyles = {
  Touchable,
  Texts,
  Label,
  Hint,
};
