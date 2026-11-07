import { Animated } from 'react-native';
import styled from 'styled-components/native';

const Hit = styled.Pressable`
  flex: 1;
`;

const Scale = styled(Animated.View)`
  flex: 1;
`;

export const PressScaleStyles = {
  Hit,
  Scale,
};
