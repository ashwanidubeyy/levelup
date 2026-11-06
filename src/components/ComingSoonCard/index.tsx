import React from 'react';
import SystemPanel from '../SystemPanel';
import StatusChip from '../StatusChip';
import type { ComingSoonCardProps } from '../../types';
import { ComingSoonCardStyles } from './styles';

const ComingSoonCard = ({ title, body, badge }: ComingSoonCardProps) => (
  <SystemPanel variant="monarch">
    <StatusChip label={badge} variant="monarch" />
    <ComingSoonCardStyles.Title>{title}</ComingSoonCardStyles.Title>
    <ComingSoonCardStyles.Body>{body}</ComingSoonCardStyles.Body>
  </SystemPanel>
);

export default ComingSoonCard;
