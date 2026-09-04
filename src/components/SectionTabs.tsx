import { useEffect, useState } from 'react';

const TABS = [
  { id: 'section-missing', label: 'Missing Requirements' },
  { id: 'section-quarters', label: 'Quarter by Quarter' },
  { id: 'section-major', label: 'Academic' },
  { id: 'section-ways', label: 'Ways' },
  { id: 'section-writing', label: 'COLLEGE & Writing' },
  { id: 'section-test-credits', label: 'External Credits' },
];

// Header height (h-14 = 56px) + this tab bar (~36px) = ~92px total sticky offset
const SCROLL_OFFSET = 96;

export function SectionTabs() {
  const [active, setActive] = useState(TABS[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const tab of TABS) {
      const el = document.getElementById(tab.id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(tab.id); },
        // Fires when section top crosses into the upper 20% of the viewport
        { rootMargin: '-10% 0px -75% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActive(id);
  };

  return (
    <div className="section-tabs sticky top-0 lg:top-14 z-30 backdrop-blur border-b">
      <div className="px-2 sm:px-6 lg:px-10 flex gap-0.5 sm:gap-1 py-1 overflow-x-auto overscroll-x-contain" aria-label="Plan sections">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => scrollTo(tab.id)}
            aria-current={active === tab.id ? 'true' : undefined}
            className={`h-8 sm:h-auto px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-md font-medium whitespace-nowrap transition-colors shrink-0
              ${active === tab.id
                ? 'bg-cardinal-700 text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/70'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
