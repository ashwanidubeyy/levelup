import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const Gradient = styled(LinearGradient)<{ $fill: boolean }>`
  ${({ $fill }) =>
    $fill
      ? `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `
      : ''}
`;

export const GradientViewStyles = {
  Gradient,
};
