import { useState } from 'react';
import { User, Smartphone, Lock, Eye, EyeOff } from 'lucide-react';

export function SignupScreenGood() {
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pin: '',
    confirmPin: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePin = () => {
    const newErrors: Record<string, string> = {};
    if (formData.pin.length < 4) {
      newErrors.pin = 'PIN dapat 4-6 digits';
    }
    if (formData.pin !== formData.confirmPin) {
      newErrors.confirmPin = 'Hindi tugma ang PIN';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Eskwelang-Eksperto</h1>
        <p className="text-sm text-center text-teal-50">
          Proteksyon para sa inyong shared phone
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Magsimula Tayo</h2>
          <p className="text-sm text-gray-600">
            I-set up ang parental controls para sa inyong pamilya. Simple lang!
          </p>
        </div>

        {/* Form - single column, clear labels */}
        <div className="space-y-5">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Pangalan ng Magulang
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Maria Santos"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-base"
            />
          </div>

          {/* Mobile field */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
              <Smartphone className="w-4 h-4 inline mr-1" />
              Mobile Number (optional)
            </label>
            <input
              id="mobile"
              type="tel"
              placeholder="09XX XXX XXXX"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-base"
            />
            <p className="text-xs text-gray-500 mt-1">Para sa password recovery lang</p>
          </div>

          {/* PIN field */}
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="w-4 h-4 inline mr-1" />
              Gumawa ng 4-6 Digit PIN
            </label>
            <div className="relative">
              <input
                id="pin"
                type={showPin ? 'text' : 'password'}
                placeholder="••••"
                maxLength={6}
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, '') })}
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none text-base ${
                  errors.pin ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.pin && <p className="text-xs text-red-500 mt-1">{errors.pin}</p>}
          </div>

          {/* Confirm PIN field */}
          <div>
            <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-700 mb-2">
              I-confirm ang PIN
            </label>
            <div className="relative">
              <input
                id="confirmPin"
                type={showConfirmPin ? 'text' : 'password'}
                placeholder="••••"
                maxLength={6}
                value={formData.confirmPin}
                onChange={(e) => setFormData({ ...formData, confirmPin: e.target.value.replace(/\D/g, '') })}
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none text-base ${
                  errors.confirmPin ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPin(!showConfirmPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPin && <p className="text-xs text-red-500 mt-1">{errors.confirmPin}</p>}
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-sm text-teal-900">
            <span className="font-medium">💡 Paalala:</span> Ang app na ito ay "safety layer" lang. 
            Hindi ito palit sa SIM o Google account.
          </p>
        </div>
      </div>

      {/* Primary CTA - bottom, large, easy to reach */}
      <div className="p-6 bg-white border-t border-gray-200">
        <button
          onClick={validatePin}
          className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl shadow-lg active:scale-98 transition-all"
        >
          Magpatuloy
        </button>
      </div>
    </div>
  );
}

export function SignupScreenBad() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pin: '',
    confirmPin: '',
  });

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Poor header - no branding, unclear */}
      <div className="px-4 pt-6 pb-2 bg-blue-400">
        <h1 className="text-lg font-normal text-white">Registration Form</h1>
      </div>

      {/* Content - poor layout */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* No explanation, dive straight into form */}
        
        {/* Multi-column layout (bad for mobile) */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="text-xs text-gray-600">Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Mobile:</label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        {/* Cramped PIN fields */}
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-600">PIN Code:</label>
            <input
              type="password"
              value={formData.pin}
              onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            />
            <span className="text-[10px] text-gray-400">4-6 numeric</span>
          </div>
          <div>
            <label className="text-xs text-gray-600">Confirm:</label>
            <input
              type="password"
              value={formData.confirmPin}
              onChange={(e) => setFormData({ ...formData, confirmPin: e.target.value })}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        {/* Technical jargon warning */}
        <div className="mt-3 bg-yellow-100 border border-yellow-300 p-2 rounded text-xs text-gray-700">
          Warning: This application provides an additional authentication layer for shared device usage. 
          Not a replacement for primary authentication mechanisms.
        </div>

        {/* Multiple competing buttons - unclear which is primary */}
        <div className="mt-6 space-y-2">
          <div className="flex gap-2">
            <button className="flex-1 h-8 bg-blue-500 text-white text-sm rounded">
              OK
            </button>
            <button className="flex-1 h-8 bg-gray-400 text-white text-sm rounded">
              Cancel
            </button>
          </div>
          <button className="w-full h-8 bg-green-500 text-white text-sm rounded">
            Submit
          </button>
          <button className="w-full h-8 bg-purple-500 text-white text-sm rounded">
            Continue
          </button>
        </div>

        {/* Tiny text links */}
        <div className="mt-4 flex justify-between text-[10px] text-blue-600">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Help</a>
          <a href="#">About</a>
        </div>
      </div>
    </div>
  );
}
