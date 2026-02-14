import { useState, useEffect } from 'react';
import { Lock, CircleAlert, Loader2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export function LoginScreenGood() {
  const { login, loginWithMobile, user, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [mobile, setMobile] = useState('');
  const [isFullLogin, setIsFullLogin] = useState(!user); // Default to full login if no user
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, go to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Update mode if user state changes (e.g. after logout)
  useEffect(() => {
    if (!user) setIsFullLogin(true);
  }, [user]);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let result;
      if (isFullLogin) {
        if (!mobile || pin.length < 4) {
          setError('Please enter mobile number and PIN');
          setIsLoading(false);
          return;
        }
        result = await loginWithMobile(mobile, pin);
      } else {
        result = await login(pin);
      }

      if (result.success) {
        // Navigation handled by useEffect
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-teal-600/20 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-600/20 rounded-full blur-3xl mix-blend-screen" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-gray-700">
            <Lock className="w-10 h-10 text-teal-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {isFullLogin ? 'Sign In' : 'Welcome Back!'}
          </h1>
          <p className="text-gray-400">
            {isFullLogin
              ? 'Enter your mobile number and PIN'
              : `Hello ${user?.full_name}, enter PIN`}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            {isFullLogin && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="0912 345 6789"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-gray-800 border-2 border-gray-700 text-white text-lg px-4 py-3 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all outline-none placeholder:text-gray-600"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                {isFullLogin ? 'Privacy PIN' : 'Enter PIN'}
              </label>
              <input
                type="password"
                placeholder="******"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className={`w-full bg-gray-800 border-2 border-gray-700 text-white text-center text-3xl font-mono tracking-[0.5em] py-4 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all outline-none placeholder:text-gray-600 placeholder:text-lg placeholder:tracking-normal placeholder:font-sans ${!isFullLogin ? 'auto-focus' : ''}`}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
              <CircleAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || pin.length < 4 || (isFullLogin && !mobile)}
            className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-teal-500/20 hover:bg-teal-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                {isFullLogin ? 'Login' : 'Unlock App'}
                <ArrowRight className="w-5 h-6 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="flex flex-col gap-3 text-center mt-6">
            {user && !isFullLogin && (
              <button
                type="button"
                onClick={() => { setIsFullLogin(true); setPin(''); }}
                className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium"
              >
                Switch Account / Not {user.full_name}?
              </button>
            )}

            {isFullLogin && user && (
              <button
                type="button"
                onClick={() => setIsFullLogin(false)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel and unlock as {user.full_name}
              </button>
            )}

            <button type="button" onClick={() => navigate('/signup')} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Don't have an account? <span className="text-teal-500 hover:underline">Sign up</span>
            </button>
          </div>
        </form>
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
