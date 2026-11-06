import React from 'react';
import type { RankBadgeProps } from '../../types';
import { RankBadgeStyles } from './styles';

const RankBadge = ({ rank, image, size = 'small', active = true }: RankBadgeProps) => {
  const large = size === 'large';

  return (
    <RankBadgeStyles.Container $large={large} $active={active}>
      <RankBadgeStyles.Portrait source={image} resizeMode="cover" $active={active} />
      <RankBadgeStyles.Letter $large={large}>{rank}</RankBadgeStyles.Letter>
    </RankBadgeStyles.Container>
  );
};

export default RankBadge;
