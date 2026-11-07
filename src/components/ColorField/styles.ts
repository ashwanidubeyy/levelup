import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const Block = styled.View`
  margin-top: ${moderateVerticalScale(14, 0.9)}px;
`;

const LabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(14, 0.9)}px;
  color: ${({ theme }) => theme.bento.textPrimary};
`;

const Swatch = styled.View<{ $color: string }>`
  width: ${moderateScale(28, 0.9)}px;
  height: ${moderateScale(28, 0.9)}px;
  border-radius: ${moderateScale(8, 0.9)}px;
  background-color: ${({ $color }) => $color};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
`;

const Track = styled.View`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  height: ${moderateVerticalScale(28, 0.9)}px;
  border-radius: ${moderateScale(8, 0.9)}px;
  overflow: hidden;
  justify-content: center;
`;

const TrackFill = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Thumb = styled.View<{ $left: number }>`
  width: ${moderateScale(16, 0.9)}px;
  height: ${moderateScale(16, 0.9)}px;
  margin-left: ${({ $left }) => $left}px;
  border-radius: ${moderateScale(8, 0.9)}px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-width: ${moderateScale(2, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.textPrimary};
`;

const Swatches = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8, 0.9)}px;
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
`;

const Chip = styled.Pressable<{ $color: string; $active: boolean }>`
  width: ${moderateScale(28, 0.9)}px;
  height: ${moderateScale(28, 0.9)}px;
  border-radius: ${moderateScale(14, 0.9)}px;
  background-color: ${({ $color }) => $color};
  border-width: ${moderateScale(2, 0.9)}px;
  border-color: ${({ $active, theme }) => ($active ? theme.bento.textPrimary : theme.bento.border)};
`;

const Hex = styled.TextInput`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  padding: ${moderateVerticalScale(8, 0.9)}px ${moderateScale(12, 0.9)}px;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
  background-color: ${({ theme }) => theme.bento.surfaceSecondary};
  color: ${({ theme }) => theme.bento.textPrimary};
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(14, 0.9)}px;
`;

export const ColorFieldStyles = {
  Block,
  LabelRow,
  Label,
  Swatch,
  Track,
  TrackFill,
  Thumb,
  Swatches,
  Chip,
  Hex,
};
