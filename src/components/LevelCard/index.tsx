import React from 'react';
import SystemPanel from '../SystemPanel';
import StatBar from '../StatBar';
import type { LevelCardProps } from '../../types';
import { LevelCardStyles } from './styles';

const LevelCard = ({ title, levelLabel, xpLabel, progress }: LevelCardProps) => (
  <SystemPanel title={title} rightLabel={levelLabel} variant="monarch">
    <LevelCardStyles.Xp>{xpLabel}</LevelCardStyles.Xp>
    <StatBar progress={progress} variant="monarch" thin />
  </SystemPanel>
);

export default LevelCard;
