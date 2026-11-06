import React from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '../../components/PageContainer';
import AnimeHeroCard from '../../components/AnimeHeroCard';
import ScreenHeader from '../../components/ScreenHeader';
import SystemPanel from '../../components/SystemPanel';
import RankBadge from '../../components/RankBadge';
import StatBar from '../../components/StatBar';
import QuestCard from '../../components/QuestCard';
import InfoRow from '../../components/InfoRow';
import EmptyState from '../../components/EmptyState';
import { QuestsStyles } from './styles';
import type { QuestProgress, RankId, XpLogEntry } from '../../types';
import { QUEST_CONSTANTS, QUEST_TITLE_KEYS, RANKS } from '../../constants/quests';
import { HOME_CONSTANTS } from '../../constants/screens';
import { SCREEN_IMAGES } from '../../constants/images';
import { TRACKER_CONSTANTS } from '../../constants/tracker';
import { useAppSelector } from '../../store';
import { useQuestBoard } from '../../hooks/useQuestBoard';
import { formatDayLabel } from '../../utils/date';
import { toQuestCardProps, xpLabel } from '../../utils/format';

const Quests = () => {
  const { t } = useTranslation();
  const dailyLimit = useAppSelector(state => state?.settings?.dailyLimit) ?? TRACKER_CONSTANTS.LIMIT.DEFAULT;
  const { quests, penalty, levelInfo, log, input } = useQuestBoard();

  const hasLocked = quests?.some((quest: QuestProgress) => quest?.status === 'locked');

  return (
    <PageContainer>
      <AnimeHeroCard image={SCREEN_IMAGES.QUESTS_BANNER} size="short">
        <ScreenHeader title={t(QUEST_CONSTANTS.TITLE)} subtitle={t(QUEST_CONSTANTS.SUBTITLE)} />
      </AnimeHeroCard>
      <SystemPanel title={t(QUEST_CONSTANTS.CURRENT)} rightLabel={t(QUEST_CONSTANTS.RANK_LABEL, { rank: levelInfo.rank })} variant="monarch">
        <QuestsStyles.LevelRow>
          <RankBadge rank={levelInfo.rank} image={levelInfo.rankImage} size="large" />
          <QuestsStyles.LevelInfo>
            <QuestsStyles.RankName>{t(levelInfo.rankNameKey)}</QuestsStyles.RankName>
            <QuestsStyles.LevelText>
              {t(QUEST_CONSTANTS.LEVEL_XP, {
                level: t(HOME_CONSTANTS.LEVEL, { level: levelInfo.level }),
                xp: t(HOME_CONSTANTS.XP, { current: levelInfo.currentXp, next: levelInfo.nextLevelXp }),
              })}
            </QuestsStyles.LevelText>
            <StatBar progress={levelInfo.progress} variant="monarch" />
          </QuestsStyles.LevelInfo>
        </QuestsStyles.LevelRow>
      </SystemPanel>
      <SystemPanel title={t(QUEST_CONSTANTS.DAILY)} rightLabel={formatDayLabel(input.day)}>
        <QuestsStyles.Note>{t(QUEST_CONSTANTS.EVALUATED)}</QuestsStyles.Note>
        {hasLocked ? <QuestsStyles.Note>{t(QUEST_CONSTANTS.LOCKED_REASON)}</QuestsStyles.Note> : null}
        {quests?.map((quest: QuestProgress) => (
          <QuestCard key={quest?.id} image={quest?.image} {...toQuestCardProps(quest, dailyLimit, t)} />
        ))}
        <QuestCard image={penalty.image} {...toQuestCardProps(penalty, dailyLimit, t)} />
      </SystemPanel>
      <SystemPanel title={t(QUEST_CONSTANTS.RANKS)}>
        <QuestsStyles.Ladder>
          {RANKS.map((rank: (typeof RANKS)[number]) => (
            <QuestsStyles.Rung key={rank.id}>
              <RankBadge rank={rank.id as RankId} image={rank.image} active={levelInfo.level >= rank.minLevel} />
              <QuestsStyles.RungLabel $active={levelInfo.rank === rank.id}>
                {t(QUEST_CONSTANTS.RANK_LEVEL, { level: rank.minLevel })}
              </QuestsStyles.RungLabel>
            </QuestsStyles.Rung>
          ))}
        </QuestsStyles.Ladder>
      </SystemPanel>
      <SystemPanel title={t(QUEST_CONSTANTS.LOG)} variant="danger">
        {log.length === 0 ? <EmptyState image={SCREEN_IMAGES.QUEST_LOG_EMPTY} message={t(QUEST_CONSTANTS.EMPTY_LOG)} /> : null}
        {log.map((entry: XpLogEntry) => (
          <InfoRow
            key={entry?.id}
            label={t(QUEST_CONSTANTS.LOG_LABEL, {
              day: formatDayLabel(entry?.day),
              quest: t(QUEST_TITLE_KEYS[entry?.questId]),
            })}
            value={xpLabel(entry?.xp ?? 0, t)}
            emphasis={(entry?.xp ?? 0) < 0 ? 'danger' : 'system'}
          />
        ))}
      </SystemPanel>
    </PageContainer>
  );
};

export default Quests;
