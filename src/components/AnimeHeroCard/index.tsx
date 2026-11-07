import React from 'react';
import { useTheme } from 'styled-components/native';
import GradientView from '../GradientView';
import type { AnimeHeroCardProps } from '../../types';
import { AnimeHeroCardStyles } from './styles';
import type { AppTheme } from '../../theme/types';

const AnimeHeroCard = ({ image, children, size = 'medium' }: AnimeHeroCardProps) => {
  const theme = useTheme() as AppTheme;
  return (
    <AnimeHeroCardStyles.Container $size={size}>
      <AnimeHeroCardStyles.Backdrop source={image} resizeMode="cover" />
      <GradientView colors={[...theme.gradients.HERO_SCRIM]} fill />
      <AnimeHeroCardStyles.Content>{children}</AnimeHeroCardStyles.Content>
    </AnimeHeroCardStyles.Container>
  );
};

export default AnimeHeroCard;
