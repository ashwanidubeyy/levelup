import styled from 'styled-components/native';
import { scaleForTheme, themeVSpace } from '../../theme/layoutScale';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BACKGROUND};
`;

const Ambient = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => themeVSpace(theme, 'XXL') * 3}px;
  background-color: ${({ theme }) => theme.colors.GLASS_HIGHLIGHT};
  opacity: 0.35;
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Content = styled.View<{ $top: number; $bottom: number; $grow: boolean }>`
  position: relative;
  z-index: 1;
  ${({ $grow }) => ($grow ? 'flex: 1;' : '')}
  padding-left: ${({ theme }) => scaleForTheme(theme.layout.contentInset, theme.layout.scale)}px;
  padding-right: ${({ theme }) => scaleForTheme(theme.layout.contentInset, theme.layout.scale)}px;
  padding-top: ${({ $top, theme }) => $top + themeVSpace(theme, 'MD')}px;
  padding-bottom: ${({ $bottom, theme }) => $bottom + themeVSpace(theme, 'XL')}px;
`;

export const PageContainerStyles = {
  Container,
  Ambient,
  Scroll,
  Content,
};
