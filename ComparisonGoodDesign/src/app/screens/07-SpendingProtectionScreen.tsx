import { useState } from 'react';
import { Wallet, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export function SpendingProtectionScreenGood() {
  const [weeklyLimit, setWeeklyLimit] = useState(100);
  const [requirePin, setRequirePin] = useState(true);
  const [pinThreshold, setPinThreshold] = useState(20);

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Load Protection</h1>
            <p className="text-sm text-gray-600">Proteksyon sa gastos ng load</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto space-y-6">
        {/* Weekly limit */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Lingguhang Limit
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Maximum na pwedeng gastusin kada linggo
          </p>
          
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-baseline gap-2 justify-center">
              <span className="text-4xl font-bold text-teal-700">₱{weeklyLimit}</span>
              <span className="text-sm text-gray-600">/ week</span>
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={weeklyLimit}
            onChange={(e) => setWeeklyLimit(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-600 [&::-webkit-slider-thumb]:cursor-pointer"
          />
          
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₱0</span>
            <span>₱500</span>
          </div>
        </div>

        {/* PIN requirement */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              requirePin ? 'bg-teal-100' : 'bg-gray-100'
            }`}>
              <Shield className={`w-6 h-6 ${requirePin ? 'text-teal-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Humingi ng PIN sa Gastos
              </h2>
              <p className="text-sm text-gray-600">
                Kailangan ng parent PIN bago makabili ng load o in-app purchase
              </p>
            </div>
            <button
              onClick={() => setRequirePin(!requirePin)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                requirePin ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                requirePin ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {requirePin && (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Humingi ng PIN kapag higit sa:
              </label>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-teal-700">₱{pinThreshold}</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={pinThreshold}
                  onChange={(e) => setPinThreshold(Number(e.target.value))}
                  className="flex-1 h-2 bg-teal-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-600 [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Summary card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Proteksyon Active</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Weekly limit: ₱{weeklyLimit}</li>
                <li>✓ PIN required: {requirePin ? 'Oo' : 'Hindi'}</li>
                {requirePin && <li>✓ PIN threshold: ₱{pinThreshold}</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Warning about disabling */}
        <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900">
            <span className="font-medium">Paalala:</span> Kung i-off ang proteksyon, 
            walang hadlang sa pagbili ng load o in-app purchases.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 bg-white border-t border-gray-200">
        <button className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl shadow-lg active:scale-98 transition-all">
          I-save ang Settings
        </button>
      </div>
    </div>
  );
}

export function SpendingProtectionScreenBad() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Poor header */}
      <div className="px-3 py-2 bg-gray-200 border-b">
        <h1 className="text-sm font-normal text-gray-700">Purchase Settings</h1>
      </div>

      {/* Content - poor layout */}
      <div className="flex-1 px-3 py-3 overflow-y-auto">
        {/* Cramped form */}
        <div className="space-y-3">
          <div className="bg-gray-100 p-2 rounded">
            <label className="text-xs text-gray-600">Weekly Budget (PHP):</label>
            <input 
              type="number" 
              defaultValue="100"
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs mt-1"
            />
          </div>

          <div className="bg-gray-100 p-2 rounded">
            <label className="text-xs text-gray-600">PIN Protection:</label>
            <div className="flex gap-2 mt-1">
              <button className="flex-1 h-7 bg-blue-400 text-white text-xs rounded">Enable</button>
              <button className="flex-1 h-7 bg-gray-400 text-white text-xs rounded">Disable</button>
            </div>
          </div>

          <div className="bg-gray-100 p-2 rounded">
            <label className="text-xs text-gray-600">PIN Threshold:</label>
            <input 
              type="number" 
              defaultValue="20"
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs mt-1"
            />
          </div>
        </div>

        {/* Confusing buttons - poor color use */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="h-8 bg-blue-500 text-white text-xs rounded">
            Save
          </button>
          <button className="h-8 bg-blue-500 text-white text-xs rounded">
            Apply
          </button>
          <button className="h-8 bg-gray-400 text-white text-xs rounded">
            Cancel
          </button>
          {/* Dangerous action with wrong color */}
          <button className="h-8 bg-blue-500 text-white text-xs rounded">
            Disable All
          </button>
        </div>

        {/* Technical warning - hard to understand */}
        <div className="mt-3 bg-yellow-50 border border-yellow-200 p-2 rounded">
          <p className="text-[9px] text-gray-600 leading-tight">
            WARNING: Modification of spending limit configurations may result in unauthorized 
            financial transactions. PIN authentication mechanism provides additional security layer 
            for monetary operations above specified threshold value.
          </p>
        </div>

        {/* Poor summary formatting */}
        <div className="mt-3 bg-gray-50 p-2 rounded text-[10px] text-gray-600">
          Current: Limit=100 | PIN=ON | Threshold=20 | Status=Active
        </div>
      </div>
    </div>
  );
}
