import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BACKGROUND};
`;

export const KeybordViewStyles = {
  Container,
};
