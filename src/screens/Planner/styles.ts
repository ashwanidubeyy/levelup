import styled from 'styled-components/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { SPACING, V_SPACING } from '../../theme/spacing';

const Block = styled.View`
  margin-top: ${V_SPACING.SM}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.SM}px;
`;

const Title = styled.Text<{ $done?: boolean }>`
  flex: 1;
  color: ${(props: { $done?: boolean; theme: { colors: { TEXT_DIM: string; TEXT: string } } }) =>
    props?.$done ? props.theme.colors.TEXT_DIM : props.theme.colors.TEXT};
  font-size: ${moderateScale(15, 0.9)}px;
  text-decoration-line: ${(props: { $done?: boolean }) => (props?.$done ? 'line-through' : 'none')};
`;

const Meta = styled.Text`
  color: ${({ theme }) => theme.colors.TEXT_DIM};
  font-size: ${moderateScale(12, 0.9)}px;
  margin-bottom: ${V_SPACING.XS}px;
`;

const Actions = styled.View`
  flex-direction: row;
  gap: ${SPACING.XS}px;
  margin-top: ${V_SPACING.XS}px;
`;

const Empty = styled.Text`
  color: ${({ theme }) => theme.colors.TEXT_DIM};
  font-size: ${moderateScale(13, 0.9)}px;
`;

const ItemBlock = styled.View`
  margin-top: ${V_SPACING.SM}px;
  padding-top: ${V_SPACING.SM}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.PANEL_BORDER};
`;

export const PlannerStyles = {
  Block,
  Row,
  Title,
  Meta,
  Actions,
  Empty,
  ItemBlock,
};
