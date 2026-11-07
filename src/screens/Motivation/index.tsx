import React from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import MotivationDeck from '../../components/MotivationDeck';
import { MotivationStyles } from './styles';
import { HOME_CONSTANTS } from '../../constants/screens';

const Motivation = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <ScreenHeader title={t(HOME_CONSTANTS.MOTIVATION_TITLE)} subtitle={t(HOME_CONSTANTS.MOTIVATION_HINT)} />
      <MotivationStyles.Wrap>
        <MotivationDeck full />
      </MotivationStyles.Wrap>
    </PageContainer>
  );
};

export default Motivation;
