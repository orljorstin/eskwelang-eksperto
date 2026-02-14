import { useNavigate } from 'react-router-dom';
import { Globe, Users, Smartphone, CircleHelp, Shield, ChevronRight, TriangleAlert, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useT } from '../../context/LanguageContext';

export function SettingsScreenGood() {
  const navigate = useNavigate();
  const { profiles, logout } = useApp();
  const { t } = useT();

  const childCount = profiles.filter(p => p.role === 'child').length;

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('settings')}</h1>
          <p className="text-sm text-gray-600 mt-1">{t('manageAppSettings')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Settings sections - clear grouping */}
        <div className="space-y-6">
          {/* General section */}
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
              General
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <button
                onClick={() => navigate('/settings/language')}
                className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{t('language')}</p>
                  <p className="text-sm text-gray-600">Taglish / English</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => navigate('/profile-management')}
                className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{t('manageProfiles')}</p>
                  <p className="text-sm text-gray-600">{profiles.length} profiles • {childCount} children</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Protection section */}
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
              {t('protectionSettings')}
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <button
                onClick={() => navigate('/settings/launcher')}
                className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{t('launcherSettings')}</p>
                  <p className="text-sm text-gray-600">{t('appRestrictions')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => navigate('/spending-protection')}
                className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{t('loadProtection')}</p>
                  <p className="text-sm text-gray-600">{t('purchaseLimits')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Help section */}
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
              Support
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <button
                onClick={() => navigate('/settings/help')}
                className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CircleHelp className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{t('howToUse')}</p>
                  <p className="text-sm text-gray-600">Tutorial & FAQ</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Advanced section */}
          <div>
            <h2 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-3 px-1">
              {t('advanced')}
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border-2 border-red-200">
              <button
                onClick={() => navigate('/settings/advanced')}
                className="w-full px-4 py-4 flex items-center gap-4 hover:bg-red-50 transition-colors"
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TriangleAlert className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-red-900">{t('advancedSettings')}</p>
                  <p className="text-sm text-red-600">⚠️ {t('notRecommended')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                logout();
                navigate('/login');
              }
            }}
            className="w-full py-4 text-center text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
          >
            {t('logout')}
          </button>

          {/* App info */}
          <div className="pt-2 text-center pb-8">
            <p className="text-xs text-gray-500">Eskwelang-Eksperto v1.0</p>
            <p className="text-xs text-gray-400 mt-1">Para sa pamilya 💙</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsScreenBad() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Poor header */}
      <div className="px-3 py-2 bg-gray-200 border-b">
        <h1 className="text-sm font-normal text-gray-700">Configuration</h1>
      </div>

      {/* Content - poor organization */}
      <div className="flex-1 px-3 py-3 overflow-y-auto">
        {/* Mixed settings list - no grouping */}
        <div className="space-y-1">
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
            <span className="text-xs text-gray-700">Language</span>
            <button className="text-[10px] bg-blue-400 text-white px-2 py-1 rounded">Change</button>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
            <span className="text-xs text-gray-700">Profiles</span>
            <button className="text-[10px] bg-blue-400 text-white px-2 py-1 rounded">Manage</button>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
            <span className="text-xs text-gray-700">Launcher</span>
            <button className="text-[10px] bg-blue-400 text-white px-2 py-1 rounded">Config</button>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
            <span className="text-xs text-gray-700">Protection</span>
            <button className="text-[10px] bg-blue-400 text-white px-2 py-1 rounded">Edit</button>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
            <span className="text-xs text-gray-700">Help/FAQ</span>
            <button className="text-[10px] bg-blue-400 text-white px-2 py-1 rounded">View</button>
          </div>

          {/* Dangerous option not clearly marked */}
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
            <span className="text-xs text-gray-700">Disable Controls</span>
            <button className="text-[10px] bg-blue-400 text-white px-2 py-1 rounded">Off</button>
          </div>
        </div>

        {/* Overloaded with unnecessary options */}
        <div className="mt-3 space-y-1">
          <button className="w-full h-7 bg-purple-400 text-white text-xs rounded">Import Data</button>
          <button className="w-full h-7 bg-orange-400 text-white text-xs rounded">Export Logs</button>
          <button className="w-full h-7 bg-pink-400 text-white text-xs rounded">Sync Cloud</button>
          <button className="w-full h-7 bg-indigo-400 text-white text-xs rounded">Backup</button>
          <button className="w-full h-7 bg-yellow-400 text-white text-xs rounded">Restore</button>
        </div>

        {/* Technical info dump */}
        <div className="mt-4 bg-gray-100 p-2 rounded border border-gray-300">
          <p className="text-[9px] text-gray-600 leading-tight mb-1">
            System Information:
          </p>
          <p className="text-[9px] text-gray-500 leading-tight">
            Build: v1.0.234 | API Level: 28 | Database: SQLite 3.22 |
            Memory: 512MB | Storage: 2.4GB used | Last sync: 2h ago |
            Profiles: 3 | Active sessions: 1
          </p>
        </div>

        {/* Poor help text */}
        <p className="text-[9px] text-gray-400 mt-3 text-center leading-tight">
          For advanced configuration options and system administration features,
          consult documentation or contact technical support.
        </p>
      </div>
    </div>
  );
}
