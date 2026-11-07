import styled from 'styled-components/native';
import { moderateVerticalScale } from 'react-native-size-matters';

const Fields = styled.ScrollView`
  flex: 1;
`;

const Block = styled.View`
  margin-top: ${moderateVerticalScale(12, 0.9)}px;
`;

const Actions = styled.View`
  padding-top: ${moderateVerticalScale(12, 0.9)}px;
`;

export const NoteEditorStyles = {
  Fields,
  Block,
  Actions,
};
