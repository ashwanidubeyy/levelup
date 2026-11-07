import React from 'react';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';
import type { SystemPanelProps } from '../../types';
import { SystemPanelStyles } from './styles';

const SystemPanel = ({ children, title, rightLabel, variant = 'system' }: SystemPanelProps) => {
  const theme = useTheme() as AppTheme;
  const frame = theme.layout.panelFrame;
  const showCorners = frame === 'corners';
  const showFlag = frame === 'flag';
  const showGlow = frame === 'stripe' || frame === 'rounded';

  return (
    <SystemPanelStyles.Container $variant={variant} $frame={frame}>
      <SystemPanelStyles.Sheen />
      {showGlow ? <SystemPanelStyles.TopGlow $variant={variant} $frame={frame} /> : null}
      {showFlag ? <SystemPanelStyles.FlagRail $variant={variant} /> : null}
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
