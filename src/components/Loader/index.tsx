import React from 'react';
import type { LoaderProps } from '../../types';
import { LoaderStyles } from './styles';
import { LOADER_GIF } from '../../constants/images';

const Loader = ({ fullscreen = false, label }: LoaderProps) =>
  fullscreen ? (
    <LoaderStyles.Fullscreen>
      <LoaderStyles.FullImage source={LOADER_GIF} resizeMode="contain" />
      {label ? <LoaderStyles.Label>{label}</LoaderStyles.Label> : null}
    </LoaderStyles.Fullscreen>
  ) : (
    <LoaderStyles.CompactImage source={LOADER_GIF} resizeMode="contain" />
  );

export default Loader;
