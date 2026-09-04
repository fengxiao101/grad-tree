import { X } from 'lucide-react';

export function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="font-serif font-semibold text-lg text-gray-900">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 space-y-6 text-[13px] text-gray-700 leading-relaxed">

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">Information We Collect</h3>
            <p className="mb-3">
              Grad Tree stores your course plan data in your browser's sessionStorage, which is cleared when you close the tab. If you sign in with Google, your plan is also saved to Firebase so it persists and syncs across devices.
            </p>
            <p>
              When you sign in, we receive your name, email address, and Google user ID from Google's OAuth service. We use this solely to identify your saved plan.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">How We Use Your Information</h3>
            <p>
              Your plan data is used only to display and save your course plan. We do not sell, share, or use your data for advertising or any purpose other than operating the Service.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">Data Storage</h3>
            <p className="mb-3">
              Local plan data is stored in your browser's sessionStorage: it stays on your device and is discarded when you close the tab. Sign in if you want a plan to persist. Cloud-synced data is stored in Firebase Firestore.
            </p>
            <p>
              You can delete your account data at any time by signing out, which also clears the local copy. Closing the tab discards any plan that was never signed in.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">Third-Party Services</h3>
            <p>
              Grad Tree uses Google Firebase for authentication and cloud storage, and Google OAuth for sign-in. Use of these services is subject to Google's Privacy Policy.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
            <p>
              Questions about this Privacy Policy can be directed to the project maintainer via the project's GitHub repository.
            </p>
          </section>

          <p className="text-[11px] text-gray-400 border-t border-gray-100 pt-4">
            Grad Tree is an independent student project and is not affiliated with, endorsed by, or operated by Stanford University.
          </p>
        </div>
      </div>
    </div>
  );
}
