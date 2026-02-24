import { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';

export function LoginScreenGood() {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handlePinInput = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }

    setError('');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredPin = pin.join('');
    if (enteredPin.length < 4) {
      setError('Pakilagay ang buong PIN');
      return;
    }
    // Mock validation
    if (enteredPin !== '1234') {
      setAttempts(attempts + 1);
      setError('Mali ang PIN. Subukan ulit.');
      setPin(['', '', '', '']);
      document.getElementById('pin-0')?.focus();
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-teal-500 to-teal-700 flex flex-col items-center justify-center px-6">
      {/* App Logo/Branding */}
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <Lock className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Eskwelang-Eksperto</h1>
        <p className="text-teal-100 text-sm">I-unlock ang Parent Mode</p>
      </div>

      {/* PIN Input - large, clear */}
      <div className="w-full max-w-xs">
        <label className="block text-white text-sm font-medium mb-4 text-center">
          I-enter ang inyong Parent PIN
        </label>
        
        <div className="flex gap-3 justify-center mb-4">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-${index}`}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinInput(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-2xl font-bold bg-white/95 border-2 border-white rounded-xl focus:border-white focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
            />
          ))}
        </div>

        {/* Clear error message */}
        {error && (
          <div className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg flex items-start gap-2 mb-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">{error}</p>
              {attempts > 0 && (
                <p className="text-xs text-red-100 mt-1">
                  {attempts} {attempts === 1 ? 'attempt' : 'attempts'} na mali
                </p>
              )}
            </div>
          </div>
        )}

        {/* Primary CTA - strong, clear */}
        <button
          onClick={handleSubmit}
          className="w-full h-14 bg-white hover:bg-gray-50 text-teal-700 text-lg font-bold rounded-xl shadow-2xl active:scale-95 transition-all mb-4"
        >
          I-unlock
        </button>

        {/* Secondary action - visually subdued */}
        <button className="w-full text-white text-sm underline underline-offset-2 opacity-80 hover:opacity-100">
          Nakalimutan ang PIN?
        </button>
      </div>

      {/* Info note */}
      <div className="mt-12 text-center">
        <p className="text-teal-100 text-xs">
          🔒 Naka-restrict ang Child Mode hanggang mag-unlock ka
        </p>
      </div>
    </div>
  );
}

export function LoginScreenBad() {
  const [pin, setPin] = useState('');

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Poor header - no hierarchy */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">Authentication Required</span>
        </div>
      </div>

      {/* Content - poorly centered, unclear */}
      <div className="flex-1 px-4 py-8">
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-2">Enter credentials:</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        {/* Multiple equally weighted buttons - confusing */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="h-9 bg-blue-500 text-white text-sm rounded">
            OK
          </button>
          <button className="h-9 bg-blue-500 text-white text-sm rounded">
            Enter
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="h-9 bg-gray-400 text-white text-sm rounded">
            Cancel
          </button>
          <button className="h-9 bg-gray-400 text-white text-sm rounded">
            Back
          </button>
        </div>

        {/* Poor contrast link */}
        <a href="#" className="block text-center text-xs text-gray-400 underline mt-2">
          Forgot PIN?
        </a>

        {/* Ambiguous error with poor formatting */}
        <div className="mt-4 bg-gray-100 p-2 rounded">
          <p className="text-[10px] text-gray-600">
            ERROR: Authentication failed. Invalid credentials provided. Please verify input and retry operation.
          </p>
        </div>

        {/* Tiny, hard to read notice */}
        <p className="text-[9px] text-gray-400 mt-6 text-center leading-tight">
          This security checkpoint is required to access privileged functionality. 
          Child mode remains active until proper authentication is completed through the designated mechanism.
        </p>
      </div>

      {/* Bottom buttons - poor touch targets */}
      <div className="px-4 pb-4 flex gap-2">
        <button className="flex-1 h-7 bg-green-600 text-white text-xs rounded">
          Submit
        </button>
        <button className="flex-1 h-7 bg-purple-600 text-white text-xs rounded">
          Login
        </button>
        <button className="flex-1 h-7 bg-orange-600 text-white text-xs rounded">
          Continue
        </button>
      </div>
    </div>
  );
}
