import DashboardHero from './DashboardHero';
import MemberContinueLearningCard from './MemberContinueLearningCard';
import { type RecentLearning } from './dashboard.types';

type MemberHeroSectionProps = {
  nickname?: string | null;
  currentLevel: number;
  recentLearning?: RecentLearning | null;
};

export default function MemberHeroSection({
  nickname,
  currentLevel,
  recentLearning,
}: MemberHeroSectionProps) {
  return (
    <div className="flex flex-col">
      <DashboardHero
        variant="member"
        nickname={nickname}
        currentLevel={currentLevel}
        levelBadgeLabel="레벨 배지"
      />

      {recentLearning && recentLearning.progressPercent < 100 ? (
        <MemberContinueLearningCard recentLearning={recentLearning} />
      ) : null}
    </div>
  );
}
