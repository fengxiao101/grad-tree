import { useState, useRef, useEffect } from 'react';
import { Undo2, Redo2, BookOpen, Printer, Share2, Check, Copy } from 'lucide-react';
import { usePlannerStore } from '../store/usePlannerStore';
import { SITE_URL, buildShareTargets, copyShareLink } from './shareTargets';
import { AuthButton } from './AuthButton';
import { BrandLogo } from './BrandLogo';
import type { User } from '../lib/backend';

interface Props {
  totalUnits: number;
  isCoterm?: boolean;
  cotermUnits?: number;
  onBrowseCatalog: () => void;
  onPrint: () => void;
  user: User | null;
  authLoading: boolean;
  onBeforeSignIn?: () => boolean;
}

// Simple SVG icons for platforms Lucide doesn't include

function useUnitChangeShimmer(value: number) {
  const [active, setActive] = useState(false);
  const previousValue = useRef(value);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (previousValue.current === value) return;
    previousValue.current = value;

    // Unit totals still update immediately, but an in-progress shimmer is
    // allowed to finish instead of restarting for every rapid card change.
    if (locked.current) return;
    locked.current = true;
    setActive(true);
    timer.current = setTimeout(() => {
      setActive(false);
      locked.current = false;
      timer.current = null;
    }, 1200);
  }, [value]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return active;
}

export function Header({ totalUnits, isCoterm, cotermUnits = 0, onBrowseCatalog, onPrint, user, authLoading, onBeforeSignIn }: Props) {
  const undo = usePlannerStore(s => s.undo);
  const redo = usePlannerStore(s => s.redo);
  const past = usePlannerStore(s => s.past);
  const future = usePlannerStore(s => s.future);

  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  const mobileShareRef = useRef<HTMLDivElement>(null);

  const ugUnits = totalUnits - cotermUnits;
  const progress = Math.min(100, (ugUnits / 180) * 100);
  const cotermProgress = Math.min(100, (cotermUnits / 45) * 100);
  const gradShimmer = useUnitChangeShimmer(ugUnits);
  const cotermShimmer = useUnitChangeShimmer(cotermUnits);

  // Close dropdown on outside click
  useEffect(() => {
    if (!shareOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!shareRef.current?.contains(target) && !mobileShareRef.current?.contains(target)) {
        setShareOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [shareOpen]);

  const openShare = () => {
    setShareOpen(v => !v);
  };

  const copyLink = () => copyShareLink(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });

  const platforms = buildShareTargets({
    message: 'Plan your Stanford degree for free with Grad Tree',
    emailSubject: 'Grad Tree - Stanford Degree Planner',
  });

  const shareMenu = (mobile = false) => (
    <div className={`solid-ui bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-[100] ${
      mobile
        ? 'absolute right-0 top-full mt-2 w-[min(20rem,calc(100vw-1.5rem))]'
        : 'fixed right-3 top-14 w-80'
    }`}>
      <p className="text-xs font-semibold text-gray-700 mb-2">Share Grad Tree</p>
      <div className="flex items-center gap-1.5 mb-3">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[11px] text-gray-600 truncate font-mono">
          {SITE_URL}
        </div>
        <button
          onClick={copyLink}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors shrink-0 ${
            copied
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-gray-800 text-white border-transparent hover:bg-gray-700'
          }`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {platforms.map(platform => (
          <button
            key={platform.label}
            onClick={platform.action}
            className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-white text-[10px] font-medium transition-colors ${platform.bg}`}
          >
            {platform.icon}
            {platform.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <header className="relative lg:sticky lg:top-0 z-40 bg-cardinal-700 shadow-md">
      <div className="px-2 sm:px-6 lg:px-10 py-1.5 sm:py-2">
        {/* Mobile: progress and history controls stay prominent; all primary actions share one row. */}
        <div className="lg:hidden space-y-1">
          <div className="flex items-center gap-1.5">
            <button
              className="flex items-center gap-[clamp(0.25rem,0.7vw,0.5rem)] shrink-0 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              <BrandLogo className="size-[clamp(1rem,3vw,1.75rem)]" />
              <h1 className="brand-text font-serif text-[clamp(0.625rem,1.65vw,1rem)] font-bold leading-[0.9]">
                <span className="block">Cardinal</span>
                <span className="block">Planner</span>
              </h1>
            </button>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex min-h-4 items-center gap-1.5">
                <span className="grad-progress-label text-[clamp(0.625rem,1.5vw,0.875rem)] font-medium shrink-0">Progress</span>
                <div className="grad-progress-track flex-1 min-w-3 h-2 rounded-full overflow-hidden">
                  <div className={`grad-progress-fill h-full rounded-full transition-all duration-500 ${gradShimmer ? 'progress-fill-animated' : ''}`} style={{ width: `${progress}%` }} />
                </div>
                <span className="grad-progress-count text-[clamp(0.625rem,1.5vw,0.875rem)] font-bold shrink-0 tabular-nums">{ugUnits}/180</span>
              </div>
              {isCoterm && (
                <div className="flex min-h-4 items-center gap-1.5">
                  <span className="text-[clamp(0.625rem,1.5vw,0.875rem)] font-medium text-sky-100 shrink-0">Coterm</span>
                  <div className="coterm-progress-track flex-1 min-w-3 h-2 rounded-full overflow-hidden ring-1 ring-sky-200/20">
                    <div className={`coterm-progress-fill h-full rounded-full transition-all duration-500 ${cotermShimmer ? 'progress-fill-animated' : ''}`} style={{ width: `${cotermProgress}%` }} />
                  </div>
                  <span className="text-[clamp(0.625rem,1.5vw,0.875rem)] font-bold text-sky-100 shrink-0 tabular-nums">{cotermUnits}/45</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0" aria-label="Plan history">
              <button
                onClick={undo}
                disabled={past.length === 0}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-white/35 bg-white/15 text-white shadow-sm hover:bg-white/25 disabled:border-white/10 disabled:bg-black/10 disabled:text-white/35 disabled:shadow-none disabled:cursor-not-allowed transition-colors"
                aria-label="Undo"
                title="Undo (⌘Z)"
              >
                <Undo2 size={14} strokeWidth={2.4} />
              </button>
              <button
                onClick={redo}
                disabled={future.length === 0}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-white/35 bg-white/15 text-white shadow-sm hover:bg-white/25 disabled:border-white/10 disabled:bg-black/10 disabled:text-white/35 disabled:shadow-none disabled:cursor-not-allowed transition-colors"
                aria-label="Redo"
                title="Redo (⌘⇧Z)"
              >
                <Redo2 size={14} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          <div className="relative flex items-stretch gap-1" ref={mobileShareRef}>
            <button
              onClick={onBrowseCatalog}
              className="flex-1 min-w-0 h-8 flex items-center justify-center gap-[clamp(0.25rem,0.7vw,0.5rem)] whitespace-nowrap text-[clamp(0.625rem,1.5vw,0.875rem)] font-semibold text-white bg-white/10 hover:bg-white/20 px-1 py-1 rounded-md border border-white/60 hover:border-white transition-colors"
            >
              <BookOpen className="size-[clamp(0.75rem,1.7vw,1rem)] shrink-0" />
              Browse
            </button>
            <button
              onClick={onPrint}
              className="flex-1 min-w-0 h-8 flex items-center justify-center gap-[clamp(0.25rem,0.7vw,0.5rem)] whitespace-nowrap text-[clamp(0.625rem,1.5vw,0.875rem)] font-semibold text-white bg-white/10 hover:bg-white/20 px-1 py-1 rounded-md border border-white/60 hover:border-white transition-colors"
            >
              <Printer className="size-[clamp(0.75rem,1.7vw,1rem)] shrink-0" />
              Print
            </button>
            <div className="relative flex-1 min-w-0">
              <button
                onClick={openShare}
                className="w-full h-8 flex items-center justify-center gap-[clamp(0.25rem,0.7vw,0.5rem)] whitespace-nowrap text-[clamp(0.625rem,1.5vw,0.875rem)] font-semibold text-white bg-white/10 hover:bg-white/20 px-1 py-1 rounded-md border border-white/60 hover:border-white transition-colors"
                aria-expanded={shareOpen}
              >
                <Share2 className="size-[clamp(0.75rem,1.7vw,1rem)] shrink-0" />
                Share
              </button>
            </div>
            <AuthButton user={user} loading={authLoading} compact onBeforeSignIn={onBeforeSignIn} />
            {shareOpen && shareMenu(true)}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex min-h-10 items-center justify-between gap-4">
          <button
            className="flex items-center gap-[clamp(0.5rem,0.8vw,0.75rem)] shrink-0 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <BrandLogo className="size-[clamp(1.25rem,2vw,2rem)]" />
            <div>
              <h1 className="brand-text font-serif text-[clamp(0.875rem,1.15vw,1.125rem)] font-bold leading-none">Grad Tree</h1>
              <p className="brand-subtext text-[10px] leading-none mt-0.5">Year by Year Plan</p>
            </div>
          </button>

          <div className="flex-1 min-w-[140px] space-y-1">
            <div className="flex items-center gap-2">
              <span className="grad-progress-label text-xs shrink-0">Grad progress</span>
              <div className="grad-progress-track flex-1 h-2 rounded-full overflow-hidden">
                <div className={`grad-progress-fill h-full rounded-full transition-all duration-500 ${gradShimmer ? 'progress-fill-animated' : ''}`} style={{ width: `${progress}%` }} />
              </div>
              <span className="grad-progress-count text-xs font-semibold shrink-0 tabular-nums">{ugUnits}/180 units</span>
            </div>
            {isCoterm && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-200 shrink-0 w-16 truncate" title="Tag class cards as Coterm to count them here">Coterm</span>
                <div className="coterm-progress-track flex-1 h-2 rounded-full overflow-hidden">
                  <div className={`coterm-progress-fill h-full rounded-full transition-all duration-500 ${cotermShimmer ? 'progress-fill-animated' : ''}`} style={{ width: `${cotermProgress}%` }} />
                </div>
                <span className="text-xs font-semibold text-sky-100 shrink-0 tabular-nums">{cotermUnits}/45 units</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onBrowseCatalog}
              className="flex items-center gap-1 text-xs font-semibold text-white hover:bg-white/10 px-2.5 py-1 rounded-lg border-2 border-white/70 hover:border-white transition-colors"
            >
              <BookOpen size={13} /> Browse Courses
            </button>
            <button
              onClick={onPrint}
              className="flex items-center gap-1 text-xs font-semibold text-white hover:bg-white/10 px-2.5 py-1 rounded-lg border-2 border-white/70 hover:border-white transition-colors"
            >
              <Printer size={13} /> Print View
            </button>
            <div className="relative" ref={shareRef}>
              <button
                onClick={openShare}
                className="flex items-center gap-1 text-xs font-semibold text-white hover:bg-white/10 px-2.5 py-1 rounded-lg border-2 border-white/70 hover:border-white transition-colors"
              >
                <Share2 size={13} /> Share
              </button>
              {shareOpen && shareMenu()}
            </div>
            <AuthButton user={user} loading={authLoading} onBeforeSignIn={onBeforeSignIn} />
            <button
              onClick={undo}
              disabled={past.length === 0}
              className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              aria-label="Undo"
              title="Undo (⌘Z)"
            >
              <Undo2 size={15} />
            </button>
            <button
              onClick={redo}
              disabled={future.length === 0}
              className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              aria-label="Redo"
              title="Redo (⌘⇧Z)"
            >
              <Redo2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
