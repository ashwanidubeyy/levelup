import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';

const FULL_SIZE = moderateScale(220, 0.9);
const COMPACT_SIZE = moderateScale(28, 0.9);

const Fullscreen = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.BLACK};
`;

const FullImage = styled.Image`
  width: ${FULL_SIZE}px;
  height: ${FULL_SIZE}px;
`;

const CompactImage = styled.Image`
  width: ${COMPACT_SIZE}px;
  height: ${COMPACT_SIZE}px;
`;

const Label = styled.Text`
  margin-top: ${V_SPACING.LG}px;
  font-family: ${FONTS.DISPLAY_MEDIUM};
  font-size: ${FONT_SIZES.XS}px;
  letter-spacing: ${SPACING.XS}px;
  color: ${({ theme }) => theme.colors.BLUE_LIGHT};
`;

export const LoaderStyles = {
  Fullscreen,
  FullImage,
  CompactImage,
  Label,
};
