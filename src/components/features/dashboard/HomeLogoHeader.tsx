import logo from '@/assets/brand/logo.svg';

export default function HomeLogoHeader() {
  return (
    <header className="fixed left-1/2 top-0 z-40 w-full max-w-app -translate-x-1/2 bg-white/80 py-4 pl-5 backdrop-blur-[6px]">
      <img src={logo} alt="bitelearn" className="h-6 w-[111px]" />
    </header>
  );
}
