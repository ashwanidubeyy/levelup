import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';

const Container = styled.View`
  flex: 1;
`;

const StepLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  letter-spacing: ${SPACING.XS}px;
  color: ${({ theme }) => theme.colors.BLUE_LIGHT};
`;

const Title = styled.Text`
  margin-top: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BLACK};
  font-size: ${({ theme }) => themeFontSize(theme, 'XL')}px;
  letter-spacing: ${SPACING.XXS}px;
  color: ${({ theme }) => theme.colors.WHITE};
`;

const Body = styled.Text`
  margin-top: ${V_SPACING.LG}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  line-height: ${({ theme }) => themeFontSize(theme, 'MD') * 1.4}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Content = styled.View`
  margin-top: ${V_SPACING.SM}px;
`;

export const OnboardingStepStyles = {
  Container,
  StepLabel,
  Title,
  Body,
  Content,
};
