import React from 'react';
import type { GradientViewProps } from '../../types';
import { GradientViewStyles } from './styles';

const VERTICAL_START = { x: 0, y: 0 };
const VERTICAL_END = { x: 0, y: 1 };
const HORIZONTAL_END = { x: 1, y: 0 };

const GradientView = ({ colors, children, fill = false, horizontal = false }: GradientViewProps) => (
  <GradientViewStyles.Gradient
    colors={[...colors]}
    start={VERTICAL_START}
    end={horizontal ? HORIZONTAL_END : VERTICAL_END}
    $fill={fill}
    pointerEvents={fill ? 'none' : 'auto'}
  >
    {children}
  </GradientViewStyles.Gradient>
);

export default GradientView;
