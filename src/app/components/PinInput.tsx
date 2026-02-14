import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PinInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    autoFocus?: boolean;
    maxLength?: number;
    showVisibilityToggle?: boolean;
    className?: string;
}

export function PinInput({
    value,
    onChange,
    label = "PIN",
    placeholder = "• • • •",
    error,
    autoFocus = false,
    maxLength = 6,
    showVisibilityToggle = true,
    className = "",
}: PinInputProps) {
    const [showPin, setShowPin] = useState(false);

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
            )}
            <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                    type={showPin ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => {
                        // Only allow numeric input
                        if (/^\d*$/.test(e.target.value)) {
                            onChange(e.target.value);
                        }
                    }}
                    maxLength={maxLength}
                    pattern="\d*"
                    inputMode="numeric"
                    autoFocus={autoFocus}
                    className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none font-mono tracking-widest text-lg ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                    placeholder={placeholder}
                />
                {showVisibilityToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 p-1"
                    >
                        {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-xs text-red-500 ml-1 mt-1 font-medium">{error}</p>
            )}
        </div>
    );
}
