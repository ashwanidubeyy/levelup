import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const Container = styled.View<{ $granted: boolean }>`
  margin-top: ${V_SPACING.MD}px;
  padding: ${V_SPACING.MD}px ${SPACING.MD}px;
  background-color: ${COLORS.PANEL};
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ $granted }) => ($granted ? COLORS.GREEN : COLORS.PANEL_BORDER)};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Body = styled.View`
  flex: 1;
  margin-left: ${SPACING.MD}px;
`;

const Title = styled.Text`
  font-family: ${FONTS.BODY_BOLD};
  font-size: ${FONT_SIZES.MD}px;
  color: ${COLORS.TEXT};
`;

const Status = styled.Text<{ $granted: boolean }>`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.XXS}px;
  letter-spacing: ${SPACING.XXS / 2}px;
  margin-top: ${V_SPACING.XS / 2}px;
  color: ${({ $granted }) => ($granted ? COLORS.GREEN : COLORS.RED_BRIGHT)};
`;

const Description = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.SM}px;
`;

const Action = styled.View`
  margin-top: ${V_SPACING.MD}px;
`;

export const PermissionStepStyles = {
  Container,
  Row,
  Body,
  Title,
  Status,
  Description,
  Action,
};
