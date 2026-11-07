import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { V_SPACING } from '../../theme/spacing';
import { mutedText, rowBetween } from '../../utils/commonStyles';

const Block = styled.View`
  margin-top: ${V_SPACING.MD}px;
`;

const Row = styled.View`
  ${rowBetween}
  margin-top: ${V_SPACING.MD}px;
`;

const Title = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const When = styled.Text`
  ${mutedText}
  margin-left: ${V_SPACING.SM}px;
`;

const Empty = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.MD}px;
`;

export const CalendarStyles = { Block, Row, Title, When, Empty };
