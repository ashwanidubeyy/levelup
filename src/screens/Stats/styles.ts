import styled from 'styled-components/native';
import { SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const Section = styled.View``;

const Tiles = styled.View`
  flex-direction: row;
  margin-top: ${V_SPACING.LG}px;
  gap: ${SPACING.SM}px;
`;

const Note = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.SM}px;
`;

const LoaderSlot = styled.View`
  align-items: center;
  margin-top: ${V_SPACING.MD}px;
`;

export const StatsStyles = {
  Section,
  Tiles,
  Note,
  LoaderSlot,
};
