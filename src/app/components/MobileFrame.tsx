import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  variant?: 'good' | 'bad';
}

export function MobileFrame({ children, variant = 'good' }: MobileFrameProps) {
  return (
    <div className="flex items-center justify-center bg-gray-900 rounded-3xl p-4">
      <div
        className="relative w-full max-w-[375px] h-[812px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-[8px] border-gray-800"
      >
        {/* Hardware Notch / Dynamic Island simulation */}
        <div className="absolute top-0 inset-x-0 w-full h-7 z-50 flex justify-center pointer-events-none">
          <div className="w-40 h-6 bg-gray-800 rounded-b-3xl"></div>
        </div>

        {/* Status bar texts */}
        <div className="absolute top-1 left-6 z-50 text-[10px] font-medium text-gray-800 mix-blend-difference pointer-events-none">
          9:41
        </div>
        <div className="absolute top-1 right-5 z-50 flex gap-1 text-[10px] items-center text-gray-800 mix-blend-difference pointer-events-none">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 21L23.6 7H.4L12 21z" /></svg>
          <div className="w-5 h-2.5 border border-current rounded-[2px] p-[1px] relative">
            <div className="w-3/4 h-full bg-current rounded-[1px]"></div>
          </div>
        </div>

        {/* Variant badge */}
        {variant && (
          <div className={`absolute top-10 right-4 z-50 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${variant === 'good'
              ? 'bg-green-500/90 text-white border-green-400/50 shadow-[0_0_15px_rgba(34,197,94,0.5)]'
              : 'bg-red-500/90 text-white border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
            }`}>
            {variant === 'good' ? 'UX ✓ GOOD' : 'UX ✗ BAD'}
          </div>
        )}

        {/* Screen content */}
        <div className="h-full w-full overflow-y-auto relative z-0 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
