import { X } from 'lucide-react';

export function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="font-serif font-semibold text-lg text-gray-900">Terms of Use</h2>
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
            <h3 className="font-semibold text-gray-900 mb-2">Academic Information and Disclaimer</h3>
            <p className="mb-3">
              Grad Tree is an independent, unofficial academic planning tool and is not affiliated with, endorsed by, or operated by Stanford University.
            </p>
            <p className="mb-3">
              Grad Tree is provided for informational and organizational purposes only and does not constitute official academic advising or an official degree audit.
            </p>
            <p className="mb-3">
              Academic requirements, policies, course information, and program requirements may change and may vary based on a student's program, academic year, declaration date, prior coursework, or individual circumstances. Grad Tree does not guarantee that any academic information displayed through the Service is complete, current, accurate, or applicable to a particular student.
            </p>
            <p className="mb-3">
              Users are responsible for verifying degree, major, minor, course, and graduation requirements with current official Stanford University sources and the applicable department or academic advisor. If information provided by Grad Tree conflicts with an official Stanford source, the official Stanford information controls.
            </p>
            <p className="mb-3">
              The Service is provided "as is" and "as available." To the fullest extent permitted by applicable law, Grad Tree and its operators are not liable for losses arising from reliance on academic information provided through the Service, including delayed graduation, additional tuition or educational expenses, missed requirements, or course-planning decisions.
            </p>
            <p>
              Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">Acceptable Use</h3>
            <p>
              Grad Tree is intended for personal academic planning only. You agree not to use the Service in any way that violates applicable laws or regulations, or that interferes with or disrupts the Service.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">No Warranties</h3>
            <p>
              The Service is provided without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">Changes to Terms</h3>
            <p>
              These Terms may be updated from time to time. Continued use of Grad Tree after changes are posted constitutes acceptance of the updated Terms.
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
