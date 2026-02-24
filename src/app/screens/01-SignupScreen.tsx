import { useState } from 'react';
import { User, Smartphone, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import { PinInput } from '../components/PinInput';

/**
 * GOOD UX DESIGN
 * Demonstrates:
 * - Tip 14: Single-column form (avoids multi-column layouts on mobile)
 * - Tip 11: Fitts's Law (large 44px+ CTA buttons that span the width)
 * - Tip 44: Sufficient color contrast (placeholder text adapted for Dark UI)
 * - Tip  1: Human-like, friendly language with clear explanations
 */
export function SignupScreenGood() {
  const { signup } = useApp();
  const { t, mapError } = useT();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    pin: '',
    confirmPin: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.pin !== formData.confirmPin) {
      setError(t('pinMismatch'));
      return;
    }

    if (formData.pin.length < 4) {
      setError(t('pinTooShort'));
      return;
    }

    if (!formData.fullName || !formData.mobile) {
      setError(t('fillAllFields'));
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData.fullName, formData.mobile, formData.pin);
      navigate('/login');
    } catch (err: any) {
      setError(mapError(err.message) || t('signupFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-teal-600/20 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-600/20 rounded-full blur-3xl mix-blend-screen" />
      </div>

      {/* Header */}
      <div className="flex-none pt-12 pb-6 relative z-10 text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-gray-700">
          <User className="w-10 h-10 text-teal-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{t('signupTitle')}</h1>
        <p className="text-gray-400 text-sm">{t('signupSubtitle')}</p>
      </div>

      {/* Form */}
      <div className="flex-1 py-4 overflow-y-auto relative z-10 scrollbar-none">
        <div className="w-full max-w-sm mx-auto">
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">{t('fullNameLabel')}</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-800 border-2 border-gray-700 text-white rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none placeholder:text-gray-400"
                  placeholder="Juan Dela Cruz"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">{t('mobileLabel')}</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-800 border-2 border-gray-700 text-white rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none placeholder:text-gray-400"
                  placeholder="0912 345 6789"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
            </div>

            {/* PIN Setup */}
            <div>
              <PinInput
                label={t('createPinLabel')}
                value={formData.pin}
                onChange={(val) => setFormData({ ...formData, pin: val })}
                theme="dark"
              />
              <p className="text-xs text-gray-500 ml-1 mt-1">{t('pinHelper')}</p>
            </div>

            {/* Confirm PIN */}
            <div>
              <PinInput
                label={t('confirmPinLabel')}
                value={formData.confirmPin}
                onChange={(val) => setFormData({ ...formData, confirmPin: val })}
                theme="dark"
              />
            </div>

            {error && (
              <div className="flex items-center justify-center p-3 bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-xl font-medium animate-in fade-in">
                {error}
              </div>
            )}

            <div className="pt-2 pb-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-teal-500/20 hover:bg-teal-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {t('signupTitle')}...
                  </>
                ) : (
                  t('signupTitle')
                )}
              </button>
            </div>

            <div className="text-center pb-8">
              <button type="button" onClick={() => navigate('/login')} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Already have an account? <span className="text-teal-500 hover:underline">Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/**
 * BAD UX DESIGN
 * Violates:
 * - Tip 14: Multi-column layout on mobile (grid-cols-2 for form fields)
 * - Tip 11: Fitts's Law (small, cramped text links and inputs)
 * - Tip  1: Uses technical jargon instead of friendly language ("primary authentication mechanisms")
 * - Tip 41: Extremely poor spacing and cluttered buttons (No clear primary action)
 */
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
