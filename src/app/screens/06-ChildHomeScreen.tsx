import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Globe, FileText, Clock, Hand } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PinModal } from '../components/PinModal';

export function ChildHomeScreenGood() {
  const [timeRemaining, setTimeRemaining] = useState(38 * 60); // 38 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const allowedApps = [
    { id: '1', name: 'Google Classroom', icon: '📚', color: 'from-green-400 to-green-500' },
    { id: '2', name: 'Browser', icon: '🌐', color: 'from-blue-400 to-blue-500' },
    { id: '3', name: 'PDF Reader', icon: '📄', color: 'from-red-400 to-red-500' },
    { id: '4', name: 'Calculator', icon: '🔢', color: 'from-purple-400 to-purple-500' },
    { id: '5', name: 'Dictionary', icon: '📖', color: 'from-orange-400 to-orange-500' },
    { id: '6', name: 'Notes', icon: '📝', color: 'from-pink-400 to-pink-500' },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Header - clear info about current session */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-xl">
            👦
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Hi, Miguel!</h1>
            <div className="flex items-center gap-2 text-teal-100 text-sm">
              <GraduationCap className="w-4 h-4" />
              <span>School Mode</span>
            </div>
          </div>
        </div>

        {/* Timer - prominent, clear */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Time Left:</span>
          </div>
          <div className="text-2xl font-bold tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Mga Pwedeng Apps
        </h2>

        {/* App grid - simple, clear */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {allowedApps.map((app) => (
            <button
              key={app.id}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
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
            📖 Mga school apps lang ang pwede ngayon
          </p>
        </div>
      </div>

      {/* Buy Gems Simulation (Financial Protection Test) */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">$</div>
              <span className="font-bold text-orange-900">Game Store</span>
            </div>
            <span className="text-xs text-orange-700 bg-white/50 px-2 py-1 rounded">Simulation</span>
          </div>
          <p className="text-sm text-orange-800 mb-3">Test Parental Controls by trying to buy gems.</p>
          <BuyGemsButton />
        </div>
      </div>

      {/* Request more time - small, non-obvious but available */}
      <div className="px-6 pb-6 text-center">
        <button className="text-sm text-gray-500 hover:text-teal-600 font-medium underline underline-offset-2">
          Humingi ng Karagdagang Oras
        </button>
      </div>
    </div>
  );
}

function BuyGemsButton() {
  const { makePurchase, spendingLimits, verifyPin } = useApp();
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
    // PIN passed, now force purchase (bypass pin check in UI logic, but context still checks limits)
    // For prototype, we just re-call makePurchase but we need to signal it was authorized? 
    // Real app would pass a token. Here we assume if they passed the modal, they are parent.
    // Let's just call makePurchase.
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
        title="Parent Approval"
        description={`Purchase of ₱${PRICE} requires PIN.`}
      />

      <button
        onClick={handleBuy}
        disabled={status === 'loading'}
        className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        {status === 'idle' && <span>Buy Gems (₱{PRICE})</span>}
        {status === 'loading' && <span>Processing...</span>}
        {status === 'success' && <span>✅ {msg}</span>}
        {status === 'blocks' && <span>🛑 {msg}</span>}
      </button>
    </>
  );
}

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
