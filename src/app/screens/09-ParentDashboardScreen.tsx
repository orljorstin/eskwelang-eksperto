import { useState } from 'react';
import { Clock, BookOpen, Gamepad2, ShieldAlert, TrendingUp, Users, ArrowRight, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import { MOCK_STATS } from '../../data/mockStats';

export function ParentDashboardScreenGood() {
  const { user, profiles } = useApp();
  const navigate = useNavigate();
  const { t } = useT();
  const childProfiles = profiles.filter(p => p.role === 'child');
  const [activeIndex, setActiveIndex] = useState(0);

  const nextChild = () => {
    setActiveIndex(prev => (prev + 1) % childProfiles.length);
  };

  const prevChild = () => {
    setActiveIndex(prev => (prev - 1 + childProfiles.length) % childProfiles.length);
  };

  const currentChild = childProfiles[activeIndex];
  const stats = currentChild ? MOCK_STATS(currentChild.id) : { schoolTime: 0, playTime: 0 };

  const getGreetingName = () => {
    if (!user?.full_name) return 'Parent';
    return user.full_name.split(' ')[0].trim() || 'Parent';
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 bg-gray-900 text-white rounded-b-3xl shadow-lg relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-teal-600/30 rounded-full blur-3xl mix-blend-screen" />
          <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-purple-600/30 rounded-full blur-3xl mix-blend-screen" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{t('hi')}, {getGreetingName()}!</h1>
              <p className="text-gray-400 text-sm">{t('summary')}</p>
            </div>
            <div className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 border border-white/10 transition-colors" onClick={() => navigate('/settings')}>
              <Users className="w-5 h-5 text-teal-400" />
            </div>
          </div>

          {/* Carousel / Quick Switcher */}
          {childProfiles.length > 0 ? (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <button onClick={prevChild} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <ArrowRight className="w-5 h-5 text-gray-400 hover:text-white rotate-180 transition-colors" />
                </button>

                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-1">{currentChild.avatar}</div>
                  <span className="font-bold text-lg text-white">{currentChild.name}</span>
                </div>

                <button onClick={nextChild} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <ArrowRight className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </button>
              </div>
              <div className="flex justify-center gap-1 mt-2">
                {childProfiles.map((_, idx) => (
                  <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === activeIndex ? 'bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]' : 'bg-white/20'}`} />
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/create-profile')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
            >
              <UserPlus className="w-3 h-3 text-teal-400" />
              {t('addChildProfile')}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto space-y-6">

        {/* Empty State if no children */}
        {childProfiles.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{t('setupFamily')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('addChildrenDesc')}</p>
            <button
              onClick={() => navigate('/create-profile')}
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
            >
              {t('addChildProfile')}
            </button>
          </div>
        )}

        {/* Core Stats (Visible only if children exist) */}
        {childProfiles.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {/* School time */}
              <div
                onClick={() => navigate('/session')}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-teal-300 transition-all active:scale-95"
              >
                <div className="mb-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium">{t('schoolMode')}</p>
                <p className="text-xl font-bold text-gray-900">{stats.schoolTime}m</p>
              </div>

              {/* Play time */}
              <div
                onClick={() => navigate('/settings/launcher')}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-purple-300 transition-all active:scale-95"
              >
                <div className="mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium">{t('playTime')}</p>
                <p className="text-xl font-bold text-gray-900">{stats.playTime}m</p>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">{t('quickActions')}</h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => navigate('/profile-management')} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left hover:border-teal-200 transition-colors">
                  <Users className="w-5 h-5 text-blue-500 mb-2" />
                  <span className="block text-sm font-semibold text-gray-900">{t('profilesTitle')}</span>
                </button>
                <button onClick={() => navigate('/spending-protection')} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left hover:border-teal-200 transition-colors">
                  <ShieldAlert className="w-5 h-5 text-orange-500 mb-2" />
                  <span className="block text-sm font-semibold text-gray-900">{t('loadProtection')}</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-sm font-bold text-gray-900">{t('activity')}</h3>
                <button
                  onClick={() => navigate('/recent-activities')}
                  className="text-xs text-teal-600 font-medium hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="p-8 text-center text-gray-400 text-sm">
                {t('noActivity')}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ParentDashboardScreenBad() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Poor header */}
      <div className="px-3 py-2 bg-gray-200 border-b">
        <h1 className="text-sm font-normal text-gray-700">Activity Log</h1>
      </div>

      {/* Content - overwhelming data */}
      <div className="flex-1 px-3 py-3 overflow-y-auto">
        {/* Cramped stats */}
        <div className="grid grid-cols-3 gap-1 mb-3">
          <div className="bg-blue-100 p-2 rounded text-center">
            <p className="text-[10px] text-gray-600">School</p>
            <p className="text-sm font-bold text-gray-900">125m</p>
          </div>
          <div className="bg-purple-100 p-2 rounded text-center">
            <p className="text-[10px] text-gray-600">Play</p>
            <p className="text-sm font-bold text-gray-900">45m</p>
          </div>
          <div className="bg-red-100 p-2 rounded text-center">
            <p className="text-[10px] text-gray-600">Block</p>
            <p className="text-sm font-bold text-gray-900">3</p>
          </div>
        </div>

        {/* Poor list formatting - tiny fonts */}
        <div className="bg-gray-50 rounded p-2 mb-2">
          <p className="text-[9px] text-gray-600 leading-tight">
            14:30 | Miguel | School Mode | 45min | Active<br />
            13:15 | Sofia | Block:YouTube | N/A | Denied<br />
            11:00 | Miguel | Complete | 60min | Success<br />
            10:30 | Sofia | Play Mode | 30min | Complete
          </p>
        </div>

        {/* Overwhelming metrics */}
        <div className="space-y-1 mb-3">
          <div className="flex justify-between text-[10px] bg-gray-100 p-1 rounded">
            <span>Avg Session</span>
            <span>52.5 min</span>
          </div>
          <div className="flex justify-between text-[10px] bg-gray-100 p-1 rounded">
            <span>Total Today</span>
            <span>170 min</span>
          </div>
          <div className="flex justify-between text-[10px] bg-gray-100 p-1 rounded">
            <span>Block Rate</span>
            <span>12.5%</span>
          </div>
          <div className="flex justify-between text-[10px] bg-gray-100 p-1 rounded">
            <span>Compliance</span>
            <span>87.5%</span>
          </div>
        </div>

        {/* Multiple competing action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="h-7 bg-blue-400 text-white text-xs rounded">View</button>
          <button className="h-7 bg-green-400 text-white text-xs rounded">Details</button>
          <button className="h-7 bg-purple-400 text-white text-xs rounded">Export</button>
          <button className="h-7 bg-orange-400 text-white text-xs rounded">Report</button>
        </div>

        {/* Data overload */}
        <div className="mt-3 bg-yellow-50 border border-yellow-200 p-2 rounded">
          <p className="text-[9px] text-gray-600 leading-tight">
            Analytics: Total sessions=4 | Avg duration=42.5min | Peak usage=14:00-15:00 |
            Most used app=Classroom | Block frequency=0.75/hr | Compliance score=87.5% |
            Trend=+15% WoW
          </p>
        </div>
      </div>
    </div>
  );
}
