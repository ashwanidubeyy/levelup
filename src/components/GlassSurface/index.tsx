import React from 'react';
import PressScale from '../PressScale';
import { GlassSurfaceStyles } from './styles';

interface GlassSurfaceProps {
  children: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}

const GlassSurface = ({ children, onPress, accessibilityLabel }: GlassSurfaceProps) => {
  const body = (
    <GlassSurfaceStyles.Card>
      <GlassSurfaceStyles.Sheen />
      <GlassSurfaceStyles.Content>{children}</GlassSurfaceStyles.Content>
    </GlassSurfaceStyles.Card>
  );

  return onPress ? (
    <PressScale onPress={onPress} accessibilityLabel={accessibilityLabel ?? ''}>
      {body}
    </PressScale>
  ) : (
    body
  );
};

export default GlassSurface;
