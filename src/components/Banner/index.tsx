import React from 'react';
import PrimaryButton from '../PrimaryButton';
import type { BannerProps } from '../../types';
import { BannerStyles } from './styles';

const Banner = ({ message, actionLabel, onAction, variant = 'danger' }: BannerProps) => (
  <BannerStyles.Container $variant={variant}>
    <BannerStyles.Message>{message}</BannerStyles.Message>
    {actionLabel && onAction ? (
      <BannerStyles.Action>
        <PrimaryButton
          label={actionLabel}
          onPress={onAction}
          variant={variant === 'danger' ? 'danger' : 'primary'}
          compact
        />
      </BannerStyles.Action>
    ) : null}
  </BannerStyles.Container>
);

export default Banner;
