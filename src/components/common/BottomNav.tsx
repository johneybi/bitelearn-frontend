import { NavLink, useLocation } from 'react-router-dom';
import { BOTTOM_NAV_TABS } from '@/constants/bottomNavTabs';

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center">
      <div
        className="relative w-full max-w-app"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="absolute inset-x-0 bottom-0">
          <div className="h-8 bg-white/60 backdrop-blur-md" />

          <nav className="pointer-events-auto absolute inset-x-4 bottom-4 rounded-[32px] border-2 border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50">
            <ul className="flex items-center justify-between gap-1 px-1">
              {BOTTOM_NAV_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = location.pathname === tab.path;

                return (
                  <li key={tab.path} className="flex-1">
                    <NavLink
                      to={tab.path}
                      className={`flex w-full flex-col items-center justify-center gap-1.5 rounded-3xl py-3.5 transition-all active:scale-95 ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-md shadow-slate-400/20'
                          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                      }`}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      <span
                        className={`text-xs font-bold uppercase tracking-tighter ${
                          isActive ? 'opacity-100' : 'opacity-80'
                        }`}
                      >
                        {tab.label}
                      </span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
