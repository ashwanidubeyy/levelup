import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PageContainerProps } from '../../types';
import { PageContainerStyles } from './styles';
import FadeInView from '../FadeInView';

const PageContainer = ({
  children,
  scrollable = true,
  withTopInset = true,
  withBottomInset = false,
  fadeIn = true,
}: PageContainerProps) => {
  const insets = useSafeAreaInsets();

  const body = (
    <PageContainerStyles.Content
      $top={withTopInset ? insets.top : 0}
      $bottom={withBottomInset ? insets.bottom : 0}
      $grow={!scrollable}
    >
      {fadeIn ? <FadeInView>{children}</FadeInView> : children}
    </PageContainerStyles.Content>
  );

  return (
    <PageContainerStyles.Container>
      <PageContainerStyles.Ambient />
      {scrollable ? (
        <PageContainerStyles.Scroll keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {body}
        </PageContainerStyles.Scroll>
      ) : (
        body
      )}
    </PageContainerStyles.Container>
  );
};

export default PageContainer;
