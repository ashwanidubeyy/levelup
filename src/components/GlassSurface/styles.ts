import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { hexToRgba } from '../../utils/color';

const Card = styled.View`
  overflow: hidden;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.colors.GLASS_STROKE};
  background-color: ${({ theme }) => hexToRgba(theme.bento.surface, theme.colorScheme === 'light' ? 0.94 : 0.88)};
`;

const Sheen = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${moderateScale(28, 0.9)}px;
  background-color: ${({ theme }) => theme.colors.GLASS_HIGHLIGHT};
  opacity: 0.35;
`;

const Content = styled.View`
  position: relative;
`;

export const GlassSurfaceStyles = {
  Card,
  Sheen,
  Content,
};
