import React from 'react';
import GradientView from '../GradientView';
import type { AnimeHeroCardProps } from '../../types';
import { AnimeHeroCardStyles } from './styles';
import { GRADIENTS } from '../../theme/colors';

const AnimeHeroCard = ({ image, children, size = 'medium' }: AnimeHeroCardProps) => (
  <AnimeHeroCardStyles.Container $size={size}>
    <AnimeHeroCardStyles.Backdrop source={image} resizeMode="cover" />
    <GradientView colors={GRADIENTS.HERO_SCRIM} fill />
    <AnimeHeroCardStyles.Content>{children}</AnimeHeroCardStyles.Content>
  </AnimeHeroCardStyles.Container>
);

export default AnimeHeroCard;
