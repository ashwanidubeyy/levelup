import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const IMAGE = moderateScale(120, 0.9);

const Container = styled.View`
  align-items: center;
  padding: ${V_SPACING.XL}px ${SPACING.LG}px;
`;

const Picture = styled.Image`
  width: ${IMAGE}px;
  height: ${IMAGE}px;
  border-radius: ${RADIUS.XL}px;
  opacity: 0.85;
`;

const Message = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.MD}px;
  text-align: center;
`;

export const EmptyStateStyles = {
  Container,
  Picture,
  Message,
};
