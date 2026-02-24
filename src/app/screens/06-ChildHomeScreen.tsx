import { useState, useEffect } from 'react';
import { GraduationCap, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PinModal } from '../components/PinModal';
import { useT } from '../../context/LanguageContext';
import { ALLOWED_APPS } from '../../constants/allowedApps';

/**
 * GOOD UX DESIGN
 * Demonstrates:
 * - Tip  1: Human-like, friendly language ("Hi, Miguel!", "Time Left")
 * - Tip 24: Clear visual hierarchy (Prominent timer, distinct allowed apps grid)
 * - Tip 11: Fitts's Law (Large touch targets for apps and Request Time button)
 * - Tip 45: Effective use of icons for quick scanning (Clock, Graduation cap)
 */
export function ChildHomeScreenGood() {
  const { t } = useT();
  const [timeRemaining, setTimeRemaining] = useState(38 * 60); // 38 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Filter allowed apps (simulating filter, using all 'true' ones or specific list)
  const allowedAppsList = ALLOWED_APPS.filter(app => app.allowed);

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex flex-col overflow-y-auto">
      {/* Header - clear info about current session */}
      <div className="bg-gray-900 border-b border-gray-700 text-white px-6 py-4 shadow-lg sticky top-0 z-10 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-teal-600/40 rounded-full blur-3xl mix-blend-screen" />
          <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-purple-600/40 rounded-full blur-3xl mix-blend-screen" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xl shadow-inner border border-white/10">
              👦
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{t('hi')}, Miguel!</h1>
              <div className="flex items-center gap-2 text-teal-400 text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>{t('schoolMode')}</span>
              </div>
            </div>
          </div>

          {/* Timer - prominent, clear */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" />
              <span className="font-semibold">{t('timeLeft')}:</span>
            </div>
            <div className="text-2xl font-bold tabular-nums text-teal-300">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 relative z-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t('allowedApps')}
        </h2>

        {/* App grid - simple, clear */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {allowedAppsList.slice(0, 6).map((app) => (
            <button
              key={app.id}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br transition-all flex items-center justify-center text-2xl shadow-md rounded-2xl ${app.color ? app.color.replace('bg-', '') : 'bg-gray-100' // Handle color mapping if distinct
                } ${app.color ? app.color : 'bg-gray-100'}`}>
                {/* Note: ALLOWED_APPS has 'bg-green-500' format, original had 'from-green-400 to-green-500'. 
                    Adjusting for simplicity or we can update constant. 
                    Let's just use the class directly or a default. */}
                {app.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* Helper message */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-teal-200">
          <p className="text-sm text-gray-700 text-center">
            📖 {t('schoolAppsOnly')}
          </p>
        </div>
      </div>

      {/* Buy Gems Simulation (Financial Protection Test) */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">$</div>
              <span className="font-bold text-orange-900">{t('gameStore')}</span>
            </div>
            <span className="text-xs text-orange-700 bg-white/50 px-2 py-1 rounded">{t('simulation')}</span>
          </div>
          <p className="text-sm text-orange-800 mb-3">{t('testControls')}</p>
          <BuyGemsButton />
        </div>
      </div>

      {/* Request more time - prominent secondary button */}
      <div className="px-6 pb-6 text-center">
        <button className="w-full py-3.5 bg-transparent border-2 border-teal-600 text-teal-700 font-bold rounded-xl active:scale-95 hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
          <Clock className="w-5 h-5" />
          {t('requestTime')}
        </button>
      </div>
    </div>
  );
}

function BuyGemsButton() {
  const { makePurchase, spendingLimits } = useApp();
  const { t } = useT();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'blocks'>('idle');
  const [msg, setMsg] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Mock Item
  const PRICE = 150; // Above default 100 threshold

  const handleBuy = async () => {
    setStatus('loading');
    setMsg('');

    // 1. Check if PIN required (Simple check before calling context for UX)
    if (spendingLimits.require_pin && PRICE > spendingLimits.pin_threshold) {
      setShowPin(true);
      setStatus('idle');
      return;
    }

    // 2. Process
    const result = await makePurchase(PRICE, '100 Gems');
    if (result.success) {
      setStatus('success');
      setMsg(result.message || 'Success!');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('blocks');
      setMsg(result.message || 'Blocked');
    }
  };

  const handlePinSuccess = async () => {
    setShowPin(false);
    // PIN passed, now force purchase
    const result = await makePurchase(PRICE, '100 Gems');
    if (result.success) {
      setStatus('success');
      setMsg(result.message || 'Success!');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('blocks');
      setMsg(result.message || 'Blocked');
    }
  }

  return (
    <>
      <PinModal
        isOpen={showPin}
        onClose={() => setShowPin(false)}
        onSuccess={handlePinSuccess}
        title="PIN Request"
        description={`Parental PIN required for purchase (₱${PRICE})`}
      />

      <button
        onClick={handleBuy}
        disabled={status === 'loading'}
        className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        {status === 'idle' && <span>{t('buyGems')} (₱{PRICE})</span>}
        {status === 'loading' && <span>Processing...</span>}
        {status === 'success' && <span>✅ {msg}</span>}
        {status === 'blocks' && <span>🛑 {msg}</span>}
      </button>
    </>
  );
}

/**
 * BAD UX DESIGN
 * Violates:
 * - Tip 21: Conflicting actions (Request, Add, Extend, More time all side-by-side)
 * - Tip 41: Cramped UI and poor spacing (Tiny app icons, dense text)
 * - Tip  1: Technical jargon ("applications whitelisted for academic purposes")
 * - Tip 24: Confusing layout (mixes allowed and blocked apps with poor distinction)
 */
export function ChildHomeScreenBad() {
  return (
    <div className="h-full bg-white">
      {/* Cluttered header */}
      <div className="bg-blue-400 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-blue-300 rounded-full text-[10px] flex items-center justify-center">
            M
          </div>
          <span className="text-xs text-white">Miguel</span>
          <span className="text-[9px] text-blue-200">| School</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-white" />
          <span className="text-xs text-white">38:24</span>
        </div>
      </div>

      {/* Content - poor organization */}
      <div className="px-3 py-3">
        {/* Mixed allowed and blocked apps - confusing */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-green-300 rounded flex items-center justify-center text-sm">
              GC
            </div>
            <span className="text-[9px] text-gray-600 text-center">Classroom</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <div className="w-12 h-12 bg-red-300 rounded flex items-center justify-center text-sm">
              YT
            </div>
            <span className="text-[9px] text-gray-600 text-center">YouTube</span>
            <span className="text-[8px] text-red-500">Blocked</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-blue-300 rounded flex items-center justify-center text-sm">
              BR
            </div>
            <span className="text-[9px] text-gray-600 text-center">Browser</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <div className="w-12 h-12 bg-purple-300 rounded flex items-center justify-center text-sm">
              GM
            </div>
            <span className="text-[9px] text-gray-600 text-center">Games</span>
            <span className="text-[8px] text-red-500">Blocked</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-orange-300 rounded flex items-center justify-center text-sm">
              PD
            </div>
            <span className="text-[9px] text-gray-600 text-center">PDF</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-pink-300 rounded flex items-center justify-center text-sm">
              CA
            </div>
            <span className="text-[9px] text-gray-600 text-center">Calc</span>
          </div>
        </div>

        {/* Confusing timer display */}
        <div className="bg-gray-100 p-2 rounded mb-3">
          <p className="text-[10px] text-gray-600">
            Session timeout: 38 min 24 sec remaining | Mode: Educational | Status: Active
          </p>
        </div>

        {/* Multiple competing action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="h-7 bg-blue-400 text-white text-[10px] rounded">
            Request Time
          </button>
          <button className="h-7 bg-green-400 text-white text-[10px] rounded">
            Add Time
          </button>
          <button className="h-7 bg-purple-400 text-white text-[10px] rounded">
            Extend
          </button>
          <button className="h-7 bg-orange-400 text-white text-[10px] rounded">
            More Time
          </button>
        </div>

        {/* Technical alert */}
        <div className="mt-3 bg-yellow-100 border border-yellow-300 p-2 rounded">
          <p className="text-[9px] text-gray-700 leading-tight">
            NOTICE: Current profile is in restricted educational mode.
            Only applications whitelisted for academic purposes are accessible during this session period.
          </p>
        </div>
      </div>
    </div>
  );
}
