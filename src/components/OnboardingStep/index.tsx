import React from 'react';
import AnimeHeroCard from '../AnimeHeroCard';
import type { OnboardingStepProps } from '../../types';
import { OnboardingStepStyles } from './styles';

const OnboardingStep = ({ image, stepLabel, title, body, children }: OnboardingStepProps) => (
  <OnboardingStepStyles.Container>
    <AnimeHeroCard image={image} size="tall">
      <OnboardingStepStyles.StepLabel>{stepLabel}</OnboardingStepStyles.StepLabel>
      <OnboardingStepStyles.Title>{title}</OnboardingStepStyles.Title>
    </AnimeHeroCard>
    {body ? <OnboardingStepStyles.Body>{body}</OnboardingStepStyles.Body> : null}
    <OnboardingStepStyles.Content>{children}</OnboardingStepStyles.Content>
  </OnboardingStepStyles.Container>
);

export default OnboardingStep;
