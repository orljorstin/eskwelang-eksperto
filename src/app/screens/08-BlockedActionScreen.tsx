import { Lock, ArrowLeft, Clock } from 'lucide-react';
import { useT } from '../../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

export function BlockedActionScreenGood() {
  const { t } = useT();

  const navigate = useNavigate();
  const location = useLocation();
  const appName = location.state?.appName || t('thisApp');

  return (
    <div className="h-full bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col items-center justify-center px-6">
      {/* Visual indicator - clear, friendly */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-2xl mb-4 mx-auto">
          <Lock className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {t('accessDenied')}
        </h1>
        <p className="text-base text-gray-600 text-center">
          {t('schoolModeActive')}
        </p>
      </div>

      {/* Clear explanation */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-orange-200 mb-6 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">28 {t('minutes')} pa</p>
            <p className="text-sm text-gray-600">{t('untilSchoolModeEnds')}</p>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <p className="text-sm text-gray-700 text-center">
            Ang <span className="font-semibold">{appName}</span> {t('isNotAllowed')}

          </p>
        </div>
      </div>

      {/* Primary action - clear, dominant */}
      <button
        onClick={() => navigate('/dashboard')}
        className="w-full max-w-sm h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl shadow-lg active:scale-98 transition-all mb-3 flex items-center justify-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        {t('backToAllowedApps')}
      </button>

      {/* Secondary action - visually subdued */}
      <button className="text-sm text-gray-600 hover:text-teal-600 font-medium underline underline-offset-2">
        {t('askPermission')}
      </button>

      {/* Friendly illustration or message */}
      <div className="mt-8 text-center">
        <p className="text-4xl mb-2">📚</p>
        <p className="text-sm text-gray-500">{t('focusOnStudy')}</p>
      </div>
    </div>
  );
}

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
