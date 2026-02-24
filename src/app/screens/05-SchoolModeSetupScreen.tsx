import { useState } from 'react';
import { GraduationCap, Gamepad2, Clock, CircleCheck } from 'lucide-react';

type Step = 1 | 2 | 3;

export function SchoolModeSetupScreenGood() {
  const [step, setStep] = useState<Step>(1);
  const [selectedChild, setSelectedChild] = useState('Miguel');
  const [selectedMode, setSelectedMode] = useState<'school' | 'play'>('school');
  const [selectedDuration, setSelectedDuration] = useState(45);

  const children = [
    { name: 'Miguel', avatar: '👦', age: 10 },
    { name: 'Sofia', avatar: '👧', age: 7 },
  ];

  const durations = [
    { value: 30, label: '30 min' },
    { value: 45, label: '45 min' },
    { value: 60, label: '1 oras' },
    { value: 90, label: '1.5 oras' },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep((step + 1) as Step);
    }
  };

  const handleStart = () => {
    alert(`Starting ${selectedMode} mode for ${selectedChild} - ${selectedDuration} minutes`);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header with progress */}
      <div className="px-6 py-4 bg-gray-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-teal-600/30 rounded-full blur-3xl mix-blend-screen" />
          <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-purple-600/30 rounded-full blur-3xl mix-blend-screen" />
        </div>

        <div className="relative z-10">
          <h1 className="text-xl font-bold mb-3">I-setup ang Session</h1>

          {/* Progress indicator - clear steps */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= num
                  ? 'bg-teal-400 text-gray-900 shadow-[0_0_15px_rgba(45,212,191,0.5)]'
                  : 'bg-white/10 text-white/50 border border-white/10'
                  }`}>
                  {step > num ? <CircleCheck className="w-5 h-5 text-gray-900" /> : num}
                </div>
                {num < 3 && (
                  <div className={`flex-1 h-1 mx-1 rounded transition-all ${step > num ? 'bg-teal-400' : 'bg-white/10'
                    }`} />
                )}
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-sm mt-3">
            {step === 1 && 'Hakbang 1: Piliin ang bata'}
            {step === 2 && 'Hakbang 2: Piliin ang mode'}
            {step === 3 && 'Hakbang 3: Piliin ang oras'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Step 1: Choose child */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Para kanino ang session?
            </h2>
            {children.map((child) => (
              <button
                key={child.name}
                onClick={() => setSelectedChild(child.name)}
                className={`w-full p-5 rounded-xl border-3 transition-all flex items-center gap-4 ${selectedChild === child.name
                  ? 'border-teal-500 bg-teal-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                  {child.avatar}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-gray-900">{child.name}</h3>
                  <p className="text-sm text-gray-600">{child.age} years old</p>
                </div>
                {selectedChild === child.name && (
                  <CircleCheck className="w-6 h-6 text-teal-600" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Choose mode */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Anong mode?
            </h2>

            <button
              onClick={() => setSelectedMode('school')}
              className={`w-full p-6 rounded-xl border-3 transition-all ${selectedMode === 'school'
                ? 'border-teal-500 bg-teal-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">School Mode</h3>
                  <p className="text-sm text-gray-600">
                    Modules, browser, at school apps lang
                  </p>
                </div>
                {selectedMode === 'school' && (
                  <CircleCheck className="w-6 h-6 text-teal-600" />
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedMode('play')}
              className={`w-full p-6 rounded-xl border-3 transition-all ${selectedMode === 'play'
                ? 'border-teal-500 bg-teal-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Play Mode</h3>
                  <p className="text-sm text-gray-600">
                    Kasama ang games at entertainment
                  </p>
                </div>
                {selectedMode === 'play' && (
                  <CircleCheck className="w-6 h-6 text-teal-600" />
                )}
              </div>
            </button>
          </div>
        )}

        {/* Step 3: Choose duration */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Gaano katagal?
            </h2>

            {/* Preset duration chips */}
            <div className="grid grid-cols-2 gap-3">
              {durations.map((duration) => (
                <button
                  key={duration.value}
                  onClick={() => setSelectedDuration(duration.value)}
                  className={`h-16 rounded-xl border-3 transition-all flex items-center justify-center gap-2 ${selectedDuration === duration.value
                    ? 'border-teal-500 bg-teal-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <Clock className={`w-5 h-5 ${selectedDuration === duration.value ? 'text-teal-600' : 'text-gray-400'
                    }`} />
                  <span className={`text-lg font-semibold ${selectedDuration === duration.value ? 'text-teal-900' : 'text-gray-700'
                    }`}>
                    {duration.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Summary:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>👤 Bata: <span className="font-semibold">{selectedChild}</span></p>
                <p>📚 Mode: <span className="font-semibold capitalize">{selectedMode}</span></p>
                <p>⏱️ Oras: <span className="font-semibold">{selectedDuration} minuto</span></p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="p-6 bg-white border-t border-gray-200">
        {step < 3 ? (
          <button
            onClick={handleNext}
            className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl shadow-lg active:scale-98 transition-all"
          >
            Susunod
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="w-full h-14 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-lg font-bold rounded-xl shadow-xl active:scale-98 transition-all"
          >
            Simulan ang {selectedMode === 'school' ? 'School' : 'Play'} Mode
          </button>
        )}
      </div>
    </div>
  );
}

export function SchoolModeSetupScreenBad() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Poor header - no progress indication */}
      <div className="px-3 py-2 bg-gray-300 border-b">
        <h1 className="text-sm font-normal text-gray-700">Setup</h1>
      </div>

      {/* Content - everything crammed in one view */}
      <div className="flex-1 px-3 py-3 overflow-y-auto">
        {/* No clear sections */}
        <div className="space-y-2">
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-600 mb-1">Select child:</p>
            <select className="w-full px-2 py-1 border border-gray-300 rounded text-xs">
              <option>Miguel (10)</option>
              <option>Sofia (7)</option>
            </select>
          </div>

          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-600 mb-1">Mode:</p>
            <div className="flex gap-1">
              <button className="flex-1 h-7 bg-blue-400 text-white text-[10px] rounded">School</button>
              <button className="flex-1 h-7 bg-purple-400 text-white text-[10px] rounded">Play</button>
            </div>
          </div>

          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-600 mb-1">Time (minutes):</p>
            <input
              type="number"
              defaultValue="45"
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
            />
          </div>
        </div>

        {/* Confusing multiple CTAs */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="h-8 bg-green-500 text-white text-xs rounded">Start</button>
          <button className="h-8 bg-blue-500 text-white text-xs rounded">Begin</button>
          <button className="h-8 bg-purple-500 text-white text-xs rounded">OK</button>
          <button className="h-8 bg-orange-500 text-white text-xs rounded">Continue</button>
        </div>

        {/* Technical info dump */}
        <div className="mt-3 bg-yellow-50 border border-yellow-200 p-2 rounded">
          <p className="text-[10px] text-gray-600 leading-tight">
            Configuration will be applied to selected user profile. Duration is measured in minutes.
            School mode restricts access to non-educational applications. Play mode allows entertainment apps.
          </p>
        </div>
      </div>
    </div>
  );
}
