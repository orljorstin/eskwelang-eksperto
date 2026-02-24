import { Lock, ArrowLeft, Clock } from 'lucide-react';
import { useT } from '../../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * GOOD UX DESIGN
 * Demonstrates:
 * - Tip  1: Human-readable error messages explaining exactly why the app is blocked
 * - Tip 25: Clear dominant primary action ("Back to Allowed Apps")
 * - Tip 45: Friendly illustration and colors to soften the negative experience of being blocked
 */
export function BlockedActionScreenGood() {
  const { t } = useT();

  const navigate = useNavigate();
  const location = useLocation();
  const appName = location.state?.appName || t('thisApp');

  return (
    <div className="h-full bg-gray-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-teal-600/30 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-purple-600/30 rounded-full blur-3xl mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Visual indicator - clear, friendly */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 mb-4 mx-auto border-4 border-gray-800">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            {t('accessDenied')}
          </h1>
          <p className="text-base text-gray-400 text-center">
            {t('schoolModeActive')}
          </p>
        </div>

        {/* Clear explanation */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10 mb-6 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="font-semibold text-white">28 {t('minutes')} pa</p>
              <p className="text-sm text-gray-400">{t('tillSchoolModeDone')}</p>
            </div>
          </div>

          <div className="bg-black/20 rounded-lg p-4 border border-white/5">
            <p className="text-sm text-gray-300 text-center">
              Ang <span className="font-semibold text-white">{appName}</span> {t('isNotAllowed')}
            </p>
          </div>
        </div>

        {/* Primary action - clear, dominant */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full max-w-sm h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl shadow-lg active:scale-98 transition-all mb-4 flex items-center justify-center gap-2 border border-teal-500/50"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('backToAllowed')}
        </button>

        {/* Secondary action - visually subdued */}
        <button className="text-sm text-gray-400 hover:text-teal-400 font-medium underline underline-offset-2 transition-colors">
          {t('askPermission')}
        </button>

        {/* Friendly illustration or message */}
        <div className="mt-8 text-center">
          <p className="text-4xl mb-2">📚</p>
          <p className="text-sm text-gray-500">{t('focusFirst')}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * BAD UX DESIGN
 * Violates:
 * - Tip  1: Severe technical jargon ("ERROR CODE: 403_FORBIDDEN") inducing anxiety
 * - Tip 21: Six competing buttons with equal visual weight causing decision paralysis
 * - Tip 44: Extremely harsh colors (pure red header) for a routine block action
 */
export function BlockedActionScreenBad() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Poor header */}
      <div className="px-3 py-2 bg-red-500 text-white">
        <h1 className="text-xs font-normal">ACCESS DENIED</h1>
      </div>

      {/* Content - technical, unfriendly */}
      <div className="flex-1 px-3 py-4 flex flex-col items-center justify-center">
        {/* Small, unclear icon */}
        <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center mb-3">
          <Lock className="w-6 h-6 text-red-500" />
        </div>

        {/* Technical error message */}
        <div className="bg-gray-100 border border-gray-300 rounded p-3 mb-4 w-full">
          <p className="text-xs text-gray-700 mb-2">
            ERROR CODE: 403_FORBIDDEN
          </p>
          <p className="text-[10px] text-gray-600 leading-tight">
            The requested resource is not accessible within the current user profile context.
            Access restrictions are enforced by parental control policy. Application launch blocked.
          </p>
        </div>

        {/* Poor time display */}
        <div className="bg-yellow-100 p-2 rounded mb-4 w-full">
          <p className="text-[10px] text-gray-700">
            Remaining session time: 28m 43s | Mode: Educational | Status: Restricted
          </p>
        </div>

        {/* Multiple unclear buttons */}
        <div className="w-full space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button className="h-8 bg-blue-500 text-white text-xs rounded">OK</button>
            <button className="h-8 bg-blue-500 text-white text-xs rounded">Close</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="h-8 bg-gray-400 text-white text-xs rounded">Back</button>
            <button className="h-8 bg-gray-400 text-white text-xs rounded">Return</button>
          </div>
          <button className="w-full h-8 bg-green-500 text-white text-xs rounded">
            Request Override
          </button>
          <button className="w-full h-8 bg-purple-500 text-white text-xs rounded">
            Ask Permission
          </button>
        </div>

        {/* Tiny, hard to read links */}
        <div className="mt-4 flex gap-3 text-[9px] text-blue-600">
          <a href="#">Help</a>
          <a href="#">Info</a>
          <a href="#">Support</a>
        </div>
      </div>
    </div>
  );
}
