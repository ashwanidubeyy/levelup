import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';
import type { RootScreenProps } from '../../navigation/AppNavigator';
import type { AppTheme, ThemeOverrides } from '../../theme/types';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import ColorField from '../../components/ColorField';
import PrimaryButton from '../../components/PrimaryButton';
import { ThemeStudioStyles } from './styles';
import { THEME_COLOR_SWATCHES, THEME_CONSTANTS } from '../../constants/theme';
import { COMMON_CONSTANTS } from '../../constants/common';
import { useAppDispatch } from '../../store';
import { clearThemeOverrides, setThemeOverride } from '../../store/slices/settingsSlice';

type Props = RootScreenProps<'ThemeStudio'>;

const ThemeStudio = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme() as AppTheme;
  const dispatch = useAppDispatch();

  const paint = (patch: Partial<ThemeOverrides>) => {
    dispatch(setThemeOverride(patch));
  };

  return (
    <PageContainer>
      <ScreenHeader
        title={t(THEME_CONSTANTS.STUDIO_TITLE)}
        subtitle={t(THEME_CONSTANTS.STUDIO_SUBTITLE)}
        onBack={navigation.goBack}
        backLabel={t(COMMON_CONSTANTS.ACTIONS.BACK)}
      />
      <ThemeStudioStyles.Preview>
        <ThemeStudioStyles.PreviewKicker>{t(theme.bento.clockTagKey)}</ThemeStudioStyles.PreviewKicker>
        <ThemeStudioStyles.PreviewTitle>{t(THEME_CONSTANTS.PREVIEW)}</ThemeStudioStyles.PreviewTitle>
      </ThemeStudioStyles.Preview>
      <ThemeStudioStyles.Hint>{t(THEME_CONSTANTS.STUDIO_HINT)}</ThemeStudioStyles.Hint>
      <ColorField
        label={t(THEME_CONSTANTS.ACCENT)}
        value={theme.bento.accent}
        swatches={THEME_COLOR_SWATCHES.ACCENT}
        onChange={(accent: string) => paint({ accent })}
      />
      <ColorField
        label={t(THEME_CONSTANTS.BACKGROUND)}
        value={theme.bento.bg}
        swatches={THEME_COLOR_SWATCHES.BACKGROUND}
        onChange={(background: string) => paint({ background })}
      />
      <ColorField
        label={t(THEME_CONSTANTS.SURFACE)}
        value={theme.bento.surface}
        swatches={THEME_COLOR_SWATCHES.SURFACE}
        onChange={(surface: string) => paint({ surface })}
      />
      <ColorField
        label={t(THEME_CONSTANTS.TEXT)}
        value={theme.bento.textPrimary}
        swatches={THEME_COLOR_SWATCHES.TEXT}
        onChange={(text: string) => paint({ text })}
      />
      <ThemeStudioStyles.Reset>
        <PrimaryButton
          label={t(THEME_CONSTANTS.RESET)}
          onPress={() => dispatch(clearThemeOverrides())}
          variant="ghost"
        />
      </ThemeStudioStyles.Reset>
    </PageContainer>
  );
};

export default ThemeStudio;
