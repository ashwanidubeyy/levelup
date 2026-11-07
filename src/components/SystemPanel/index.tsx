import React from 'react';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';
import type { SystemPanelProps } from '../../types';
import { SystemPanelStyles } from './styles';

const SystemPanel = ({ children, title, rightLabel, variant = 'system' }: SystemPanelProps) => {
  const theme = useTheme() as AppTheme;
  const showCorners = theme.layout.panelFrame === 'corners';
  const roundedFrame = theme.layout.panelFrame === 'rounded';

  return (
  <SystemPanelStyles.Container $variant={variant} $rounded={roundedFrame}>
    <SystemPanelStyles.TopGlow $variant={variant} />
    {showCorners ? <SystemPanelStyles.CornerTopLeft $variant={variant} /> : null}
    {showCorners ? <SystemPanelStyles.CornerBottomRight $variant={variant} /> : null}
    {title ? (
      <SystemPanelStyles.Header>
        <SystemPanelStyles.Title $variant={variant}>{title}</SystemPanelStyles.Title>
        {rightLabel ? <SystemPanelStyles.RightLabel>{rightLabel}</SystemPanelStyles.RightLabel> : null}
      </SystemPanelStyles.Header>
    ) : null}
    {children}
  </SystemPanelStyles.Container>
  );
};

export default SystemPanel;
