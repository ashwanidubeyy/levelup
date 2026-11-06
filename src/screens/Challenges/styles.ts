import styled from 'styled-components/native';
import { V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const Block = styled.View`
  margin-top: ${V_SPACING.MD}px;
`;

const Empty = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.MD}px;
`;

const Log = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS}px;
`;

export const ChallengesStyles = { Block, Empty, Log };
