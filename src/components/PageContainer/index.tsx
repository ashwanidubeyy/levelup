import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientView from '../GradientView';
import type { PageContainerProps } from '../../types';
import { PageContainerStyles } from './styles';
import { GRADIENTS } from '../../theme/colors';

const PageContainer = ({
  children,
  scrollable = true,
  withTopInset = true,
  withBottomInset = false,
}: PageContainerProps) => {
  const insets = useSafeAreaInsets();

  const content = (
    <PageContainerStyles.Content
      $top={withTopInset ? insets.top : 0}
      $bottom={withBottomInset ? insets.bottom : 0}
      $grow={!scrollable}
    >
      {children}
    </PageContainerStyles.Content>
  );

  return (
    <PageContainerStyles.Container>
      <GradientView colors={GRADIENTS.SCREEN} fill />
      {scrollable ? (
        <PageContainerStyles.Scroll keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {content}
        </PageContainerStyles.Scroll>
      ) : (
        content
      )}
    </PageContainerStyles.Container>
  );
};

export default PageContainer;
