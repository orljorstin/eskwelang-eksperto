import { useState } from 'react';
import { User, Smartphone, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export function SignupScreenGood() {
  const { signup } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    pin: '',
    confirmPin: ''
  });
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.pin !== formData.confirmPin) {
      setError('PINs do not match');
      return;
    }

    if (formData.pin.length < 4) {
      setError('PIN must be at least 4 digits');
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData.fullName, formData.mobile, formData.pin);
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex-none px-6 pt-12 pb-6 bg-teal-600 text-white rounded-b-[2.5rem] shadow-lg">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Gumawa ng Account</h1>
        <p className="text-teal-100 text-sm">Create your parent profile to get started</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Full Name (Magulang)</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                placeholder="Juan Dela Cruz"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Mobile Number</label>
            <div className="relative">
              <Smartphone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                placeholder="0912 345 6789"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
          </div>

          {/* PIN Setup */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Create Privacy PIN</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPin ? 'text' : 'password'}
                required
                maxLength={6}
                pattern="[0-9]*"
                inputMode="numeric"
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none font-mono tracking-widest"
                placeholder="• • • •"
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 p-1"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 ml-1">
              Gagamitin ito para buksan ang app at settings
            </p>
          </div>

          {/* Confirm PIN */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Confirm PIN</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPin ? 'text' : 'password'}
                required
                maxLength={6}
                pattern="[0-9]*"
                inputMode="numeric"
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none font-mono tracking-widest"
                placeholder="• • • •"
                value={formData.confirmPin}
                onChange={(e) => setFormData({ ...formData, confirmPin: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPin(!showConfirmPin)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 p-1"
              >
                {showConfirmPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium animate-in fade-in">
              {error}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-teal-200 hover:bg-teal-700 hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="text-center">
            <button type="button" onClick={() => navigate('/login')} className="text-sm text-teal-600 font-medium">
              Already have an account? Login
            </button>
          </div>
        </form>
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
