import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import PrimaryButton from '../PrimaryButton';
import type { PermissionStepProps } from '../../types';
import { PermissionStepStyles } from './styles';
import { Icons } from '../../assets/icons';

const { CheckIcon, CrossIcon } = Icons;

const ICON_SIZE = moderateScale(22, 0.9);

const PermissionStep = ({ title, description, granted, statusLabel, actionLabel, onAction }: PermissionStepProps) => (
  <PermissionStepStyles.Container $granted={granted}>
    <PermissionStepStyles.Row>
      {granted ? <CheckIcon size={ICON_SIZE} /> : <CrossIcon size={ICON_SIZE} />}
      <PermissionStepStyles.Body>
        <PermissionStepStyles.Title>{title}</PermissionStepStyles.Title>
        <PermissionStepStyles.Status $granted={granted}>{statusLabel}</PermissionStepStyles.Status>
      </PermissionStepStyles.Body>
    </PermissionStepStyles.Row>
    {description ? <PermissionStepStyles.Description>{description}</PermissionStepStyles.Description> : null}
    {actionLabel && onAction ? (
      <PermissionStepStyles.Action>
        <PrimaryButton label={actionLabel} onPress={onAction} variant={granted ? 'ghost' : 'primary'} compact />
      </PermissionStepStyles.Action>
    ) : null}
  </PermissionStepStyles.Container>
);

export default PermissionStep;
