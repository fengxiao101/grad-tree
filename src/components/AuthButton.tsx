import { useEffect, useRef, useState } from 'react';
import { LogIn } from 'lucide-react';
import { signIn, signOutUser, isFirebaseConfigured } from '../lib/backend';
import type { User } from '../lib/backend';

interface Props {
  user: User | null;
  loading: boolean;
  compact?: boolean;
  /** Return false to cancel the sign-in and handle it externally (e.g. show a terms gate) */
  onBeforeSignIn?: () => boolean;
}

export function AuthButton({ user, loading, compact = false, onBeforeSignIn }: Props) {
  const [open, setOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleSignIn = async () => {
    if (onBeforeSignIn && onBeforeSignIn() === false) return;
    setSigningIn(true);
    setSignInError(null);
    try {
      await signIn();
    } catch (error) {
      const code = typeof error === 'object' && error && 'code' in error
        ? String(error.code)
        : '';

      // Closing the account chooser is expected and does not need an alert.
      if (code !== 'auth/popup-closed-by-user' && code !== 'auth/cancelled-popup-request') {
        setSignInError(
          code === 'auth/unauthorized-domain'
            ? `Google sign-in is not enabled for ${window.location.hostname}. Add this domain in Firebase Authentication settings.`
            : code === 'auth/popup-blocked'
              ? 'Your browser blocked the Google sign-in window. Allow popups for this site and try again.'
              : 'Google sign-in could not be completed. Please try again.',
        );
        console.error('[auth] Google sign-in failed:', error);
      }
    } finally {
      setSigningIn(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (!isFirebaseConfigured || loading) return null;

  if (!user) {
    return (
      <div className={compact ? 'relative flex-1' : 'relative'}>
        <button
          onClick={handleSignIn}
          disabled={signingIn}
          className={compact
            ? 'w-full h-8 flex items-center justify-center gap-[clamp(0.25rem,0.7vw,0.5rem)] whitespace-nowrap text-[clamp(0.625rem,1.5vw,0.875rem)] font-semibold text-white bg-white/10 hover:bg-white/20 disabled:opacity-60 disabled:cursor-wait px-1 py-1 rounded-md border border-white/60 hover:border-white transition-colors'
            : 'min-h-11 lg:min-h-0 flex items-center gap-1.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 disabled:opacity-60 disabled:cursor-wait px-3 py-2 lg:py-1.5 rounded-lg border-2 border-white/70 hover:border-white transition-colors'}
        >
          <LogIn
            size={compact ? undefined : 15}
            className={compact ? 'size-[clamp(0.75rem,1.7vw,1rem)] shrink-0' : undefined}
          />
          {signingIn ? 'Signing in…' : 'Sign in'}
        </button>
        {signInError && (
          <div role="alert" className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-red-200 bg-white p-3 text-xs leading-relaxed text-red-700 shadow-xl z-50">
            {signInError}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={compact ? 'relative flex-1' : 'relative'} ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className={compact
          ? 'w-full h-8 flex items-center justify-center gap-[clamp(0.25rem,0.7vw,0.5rem)] rounded-md border border-white/60 bg-white/10 px-1 text-[clamp(0.625rem,1.5vw,0.875rem)] font-semibold text-white hover:bg-white/20 hover:border-white transition-colors'
          : 'block rounded-full focus:outline-none'}
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName ?? 'User'}
            referrerPolicy="no-referrer"
            className={`${compact ? 'size-[clamp(0.875rem,1.9vw,1.125rem)]' : 'w-7 h-7'} rounded-full border-2 border-white/40 hover:border-white/80 transition-colors`}
          />
        ) : (
          <div className={`${compact ? 'size-[clamp(0.875rem,1.9vw,1.125rem)] text-[clamp(0.5rem,1vw,0.625rem)]' : 'w-7 h-7 text-xs'} rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-medium border-2 border-white/40 transition-colors`}>
            {user.displayName?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? '?'}
          </div>
        )}
        {compact && (
          <span className="whitespace-nowrap">
            <span className="min-[360px]:hidden">Me</span>
            <span className="hidden min-[360px]:inline">Account</span>
          </span>
        )}
      </button>

      {open && (
        <div className={`${compact ? 'absolute right-0 top-full mt-2' : 'fixed right-3 top-14'} solid-ui w-60 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-[100]`}>
          <div className="mb-2.5">
            <p className="text-[12px] font-semibold text-gray-800 truncate">{user.displayName ?? user.email}</p>
            <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
          </div>
          <p className="text-[11px] text-gray-500 bg-gray-50 rounded-lg px-2.5 py-2 mb-2.5 leading-relaxed">
            ✓ Your plan saves automatically and syncs across all your devices.
          </p>
          <button
            onClick={() => { setOpen(false); signOutUser(); }}
            className="w-full text-left text-[12px] text-red-500 hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
