import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const Section = styled.View`
  margin-top: ${moderateVerticalScale(16, 0.9)}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${moderateVerticalScale(8, 0.9)}px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(16, 0.9)}px;
  color: ${({ theme }) => theme.bento.textPrimary};
`;

const Refresh = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(13, 0.9)}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const Stage = styled.View<{ $full?: boolean }>`
  height: ${({ $full }) => moderateVerticalScale($full ? 460 : 236, 0.9)}px;
`;

const BackCard = styled.View`
  position: absolute;
  top: ${moderateVerticalScale(12, 0.9)}px;
  left: ${moderateScale(12, 0.9)}px;
  right: ${moderateScale(12, 0.9)}px;
  bottom: 0;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bento.surfaceSecondary};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
`;

const Card = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${moderateVerticalScale(8, 0.9)}px;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bento.surface};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
`;

const Art = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Scrim = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => (theme.colorScheme === 'light' ? theme.colors.BLACK : theme.bento.bg)};
  opacity: ${({ theme }) => (theme.colorScheme === 'light' ? 0.72 : 0.62)};
`;

const Copy = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: ${moderateVerticalScale(18, 0.9)}px ${moderateScale(16, 0.9)}px;
`;

const Quote = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-style: italic;
  font-size: ${moderateScale(20, 0.9)}px;
  line-height: ${moderateScale(26, 0.9)}px;
  color: ${({ theme }) => (theme.colorScheme === 'light' ? theme.colors.WHITE : theme.bento.textPrimary)};
`;

const Author = styled.Text`
  margin-top: ${moderateVerticalScale(10, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(12, 0.9)}px;
  letter-spacing: ${moderateScale(0.6, 0.9)}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const Hint = styled.Text`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(12, 0.9)}px;
  color: ${({ theme }) => (theme.colorScheme === 'light' ? theme.colors.WHITE : theme.bento.textSecondary)};
  opacity: ${({ theme }) => (theme.colorScheme === 'light' ? 0.82 : 1)};
`;

export const MotivationDeckStyles = {
  Section,
  Header,
  Title,
  Refresh,
  Stage,
  BackCard,
  Card,
  Art,
  Scrim,
  Copy,
  Quote,
  Author,
  Hint,
};
