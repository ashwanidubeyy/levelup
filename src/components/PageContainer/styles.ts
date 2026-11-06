import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { SPACING, V_SPACING } from '../../theme/spacing';

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BACKGROUND};
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Content = styled.View<{ $top: number; $bottom: number; $grow: boolean }>`
  ${({ $grow }) => ($grow ? 'flex: 1;' : '')}
  padding-left: ${SPACING.LG}px;
  padding-right: ${SPACING.LG}px;
  padding-top: ${({ $top }) => $top + V_SPACING.MD}px;
  padding-bottom: ${({ $bottom }) => $bottom + V_SPACING.XL}px;
`;

export const PageContainerStyles = {
  Container,
  Scroll,
  Content,
};
