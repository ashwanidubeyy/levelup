import React from 'react';
import type { SystemPanelProps } from '../../types';
import { SystemPanelStyles } from './styles';

const SystemPanel = ({ children, title, rightLabel, variant = 'system' }: SystemPanelProps) => (
  <SystemPanelStyles.Container $variant={variant}>
    <SystemPanelStyles.TopGlow $variant={variant} />
    <SystemPanelStyles.CornerTopLeft $variant={variant} />
    <SystemPanelStyles.CornerBottomRight $variant={variant} />
    {title ? (
      <SystemPanelStyles.Header>
        <SystemPanelStyles.Title $variant={variant}>{title}</SystemPanelStyles.Title>
        {rightLabel ? <SystemPanelStyles.RightLabel>{rightLabel}</SystemPanelStyles.RightLabel> : null}
      </SystemPanelStyles.Header>
    ) : null}
    {children}
  </SystemPanelStyles.Container>
);

export default SystemPanel;
