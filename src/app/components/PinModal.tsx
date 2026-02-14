import { useState, useRef, useEffect } from 'react';
import { Lock, Loader2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PinModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    title?: string;
    description?: string;
}

export function PinModal({ isOpen, onClose, onSuccess, title = "Security Check", description = "Enter your PIN to continue" }: PinModalProps) {
    const { verifyPin } = useApp();
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setPin('');
            setError('');
            // Focus input after a small delay to ensure modal logic runs
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (pin.length < 4) return;

        setIsLoading(true);
        setError('');

        try {
            const isValid = await verifyPin(pin);
            if (isValid) {
                onSuccess();
                onClose();
            } else {
                setError('Incorrect PIN');
                setPin('');
            }
        } catch (err) {
            setError('Verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-100 rounded-lg">
                            <Lock className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{title}</h3>
                            <p className="text-xs text-gray-500">{description}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <input
                            ref={inputRef}
                            type="password"
                            value={pin}
                            onChange={(e) => {
                                setPin(e.target.value);
                                if (error) setError('');
                            }}
                            maxLength={6}
                            className="w-full text-center text-4xl font-mono tracking-[0.5em] py-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all placeholder:tracking-normal placeholder:font-sans placeholder:text-gray-300"
                            placeholder="******"
                            inputMode="numeric"
                            autoFocus
                        />
                        {error && (
                            <div className="mt-3 text-center text-sm font-medium text-red-500 animate-in slide-in-from-top-1">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || pin.length < 4}
                            className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
