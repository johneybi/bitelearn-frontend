import LevelBadge from '@/components/features/level/LevelBadge';

type GuestDashboardHeroProps = {
  variant: 'guest';
};

type MemberDashboardHeroProps = {
  variant: 'member';
  nickname?: string | null;
  currentLevel?: number;
  levelBadgeLabel?: string;
};

type DashboardHeroProps = GuestDashboardHeroProps | MemberDashboardHeroProps;

export default function DashboardHero(props: DashboardHeroProps) {
  const { variant } = props;

  if (variant === 'guest') {
    return (
      <section className="pb-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-2xl font-semibold leading-9 tracking-normal text-foreground">
            처음이라 낯선 홀로서기
          </h2>
          <p className="text-sm font-medium leading-5 text-secondary">
            어려운 계약과 금융, 한 입부터 재밌게 배워봐요!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold leading-9 tracking-normal text-foreground">
            <span>반가워요, </span>
            <span className="inline-block whitespace-nowrap">
              {`${props.nickname ?? 'BiteLearn'}님`}
            </span>
          </h2>
          <p className="text-sm font-medium leading-5 text-secondary">
            오늘도 한 입 나아가는 하루!
          </p>
        </div>

        <LevelBadge
          currentLevel={props.currentLevel}
          label={props.levelBadgeLabel}
        />
      </div>
    </section>
  );
}
