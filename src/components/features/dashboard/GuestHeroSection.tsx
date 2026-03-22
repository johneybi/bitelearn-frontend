import DashboardHero from './DashboardHero';
import GuestHeroCard from './GuestHeroCard';

export default function GuestHeroSection() {
  return (
    <div className="flex flex-col">
      <DashboardHero variant="guest" />

      <GuestHeroCard />
    </div>
  );
}
