import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const Card = styled.View`
  margin-top: ${V_SPACING.MD}px;
  padding: ${V_SPACING.MD}px ${SPACING.MD}px;
  background-color: ${({ theme }) => theme.colors.PANEL_ALT};
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ theme }) => theme.colors.PANEL_BORDER};
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Meta = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS}px;
  margin-bottom: ${V_SPACING.SM}px;
`;

const Progress = styled.Text`
  margin-top: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.YELLOW};
`;

const Actions = styled.View`
  flex-direction: row;
  margin-top: ${V_SPACING.MD}px;
  gap: ${SPACING.SM}px;
`;

const ActionSlot = styled.View`
  flex: 1;
`;

export const ChallengeCardStyles = { Card, Title, Meta, Progress, Actions, ActionSlot };
