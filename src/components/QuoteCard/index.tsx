import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import GradientView from '../GradientView';
import type { QuoteCardProps } from '../../types';
import { QuoteCardStyles } from './styles';
import { Icons } from '../../assets/icons';
import { COLORS, GRADIENTS } from '../../theme/colors';

const { BoltIcon } = Icons;

const ICON_SIZE = moderateScale(30, 0.9);

const QuoteCard = ({ text, author, image, title, hint, onPress }: QuoteCardProps) => (
  <QuoteCardStyles.Container activeOpacity={0.85} onPress={onPress} disabled={!onPress} accessibilityRole="button">
    {image ? (
      <QuoteCardStyles.Thumb source={image} resizeMode="cover" />
    ) : (
      <QuoteCardStyles.Placeholder>
        <GradientView colors={GRADIENTS.MONARCH} fill />
        <BoltIcon size={ICON_SIZE} color={COLORS.WHITE} />
      </QuoteCardStyles.Placeholder>
    )}
    <QuoteCardStyles.Body>
      <QuoteCardStyles.Title>{title}</QuoteCardStyles.Title>
      <QuoteCardStyles.Quote>{text}</QuoteCardStyles.Quote>
      <QuoteCardStyles.Author>{author?.toUpperCase()}</QuoteCardStyles.Author>
      {hint ? <QuoteCardStyles.Hint>{hint}</QuoteCardStyles.Hint> : null}
    </QuoteCardStyles.Body>
  </QuoteCardStyles.Container>
);

export default QuoteCard;
