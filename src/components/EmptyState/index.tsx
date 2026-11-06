import React from 'react';
import type { EmptyStateProps } from '../../types';
import { EmptyStateStyles } from './styles';

const EmptyState = ({ image, message }: EmptyStateProps) => (
  <EmptyStateStyles.Container>
    <EmptyStateStyles.Picture source={image} resizeMode="cover" />
    <EmptyStateStyles.Message>{message}</EmptyStateStyles.Message>
  </EmptyStateStyles.Container>
);

export default EmptyState;
