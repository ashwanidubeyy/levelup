import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from 'styled-components/native';
import GradientView from '../GradientView';
import type { QuoteCardProps } from '../../types';
import { QuoteCardStyles } from './styles';
import { Icons } from '../../assets/icons';
import type { AppTheme } from '../../theme/types';

const { BoltIcon } = Icons;

const ICON_SIZE = moderateScale(30, 0.9);

const QuoteCard = ({ text, author, image, title, hint, variant = 'default', onPress }: QuoteCardProps) => {
  const theme = useTheme() as AppTheme;
  return (
    <QuoteCardStyles.Container
      $variant={variant}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
    >
      {image ? (
        <QuoteCardStyles.Thumb $variant={variant} source={image} resizeMode="cover" />
      ) : (
        <QuoteCardStyles.Placeholder $variant={variant}>
          <GradientView colors={[...theme.gradients.MONARCH]} fill />
          <BoltIcon size={variant === 'hero' ? moderateScale(44, 0.9) : ICON_SIZE} color={theme.colors.TEXT} />
        </QuoteCardStyles.Placeholder>
      )}
      <QuoteCardStyles.Body $variant={variant}>
        {title ? <QuoteCardStyles.Title>{title}</QuoteCardStyles.Title> : null}
        <QuoteCardStyles.Quote $variant={variant}>{text}</QuoteCardStyles.Quote>
        <QuoteCardStyles.Author>{author?.toUpperCase()}</QuoteCardStyles.Author>
        {hint ? <QuoteCardStyles.Hint>{hint}</QuoteCardStyles.Hint> : null}
      </QuoteCardStyles.Body>
    </QuoteCardStyles.Container>
  );
};

export default QuoteCard;
