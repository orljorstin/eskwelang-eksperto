// Mobile device frame wrapper for consistent viewport

interface MobileFrameProps {
  children: React.ReactNode;
  variant?: 'good' | 'bad';
}

export function MobileFrame({ children, variant = 'good' }: MobileFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 p-4">
      <div 
        className="relative w-full max-w-[375px] h-[667px] bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ aspectRatio: '9/16' }}
      >
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-neutral-900 text-white text-xs flex items-center justify-between px-4">
          <span>9:41</span>
          <div className="flex gap-1">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>
        
        {/* Variant badge */}
        {variant && (
          <div className={`absolute top-8 right-4 z-50 px-3 py-1 rounded-full text-xs font-semibold ${
            variant === 'good' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {variant === 'good' ? 'GOOD ✓' : 'BAD ✗'}
          </div>
        )}
        
        {/* Screen content */}
        <div className="h-full pt-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
