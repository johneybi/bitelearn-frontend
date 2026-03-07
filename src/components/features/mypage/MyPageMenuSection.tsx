import { ChevronRight } from 'lucide-react';

import type { MenuItem } from './mypage.types';

type MyPageMenuSectionProps = {
  items: MenuItem[];
};

export default function MyPageMenuSection({ items }: MyPageMenuSectionProps) {
  return (
    <section className="mt-5">
      <article className="px-4 py-4">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={index > 0 ? 'border-t border-slate-200 pt-4' : ''}
          >
            <p className="text-sm font-semibold">{item.label}</p>

            <div className="mt-4 flex flex-col gap-3 pb-4">
              {item.details.map((detail) => (
                <button
                  key={detail.text}
                  type="button"
                  className="flex items-center justify-between"
                >
                  <span className="rounded-full px-1 py-1 text-xs text-slate-700">
                    {detail.text}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}
