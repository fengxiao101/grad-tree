import { useState, useRef, useEffect } from 'react';
import { Undo2, Redo2, BookOpen, Printer, Share2, Check, Copy, Mail, MessageSquare } from 'lucide-react';
import { usePlannerStore } from '../store/usePlannerStore';
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
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const RedditIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://gradtree.app';

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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', SITE_URL);
    }
  };

  const shareMsg = 'Plan your Stanford degree for free with Grad Tree';

  const platforms = [
    {
      label: 'Messages',
      icon: <MessageSquare size={14} />,
      bg: 'social-messages',
      action: () => window.open(`sms:&body=${encodeURIComponent(`${shareMsg} ${SITE_URL}`)}`),
    },
    {
      label: 'WhatsApp',
      icon: <WhatsAppIcon />,
      bg: 'social-whatsapp',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${shareMsg} ${SITE_URL}`)}`),
    },
    {
      label: 'Telegram',
      icon: <TelegramIcon />,
      bg: 'social-telegram',
      action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(shareMsg)}`),
    },
    {
      label: 'Email',
      icon: <Mail size={14} />,
      bg: 'social-email',
      action: () => window.open(`mailto:?subject=${encodeURIComponent('Grad Tree - Stanford Degree Planner')}&body=${encodeURIComponent(`${shareMsg}\n\n${SITE_URL}`)}`),
    },
    {
      label: 'X / Twitter',
      icon: <XIcon />,
      bg: 'social-x',
      action: () => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareMsg)}&url=${encodeURIComponent(SITE_URL)}`),
    },
    {
      label: 'Reddit',
      icon: <RedditIcon />,
      bg: 'social-reddit',
      action: () => window.open(`https://reddit.com/submit?url=${encodeURIComponent(SITE_URL)}&title=${encodeURIComponent(shareMsg)}`),
    },
    {
      label: 'Facebook',
      icon: <FacebookIcon />,
      bg: 'social-facebook',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`),
    },
    {
      label: 'LinkedIn',
      icon: <LinkedInIcon />,
      bg: 'social-linkedin',
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`),
    },
  ];

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
