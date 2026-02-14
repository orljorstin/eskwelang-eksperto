import { useState, useEffect } from 'react';
import { Lock, Loader2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PinInput } from './PinInput';
import { useT } from '../../context/LanguageContext';

interface PinModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    title?: string;
    description?: string;
}

export function PinModal({ isOpen, onClose, onSuccess, title, description }: PinModalProps) {
    const { verifyPin } = useApp();
    const { t } = useT();
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setPin('');
            setError('');
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
                setError(t('incorrectPin'));
                setPin('');
            }
        } catch (err) {
            setError(t('unexpectedError'));
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
                            <h3 className="font-bold text-gray-900">{title || t('securityCheck')}</h3>
                            <p className="text-xs text-gray-500">{description || t('enterPin')}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <PinInput
                            value={pin}
                            onChange={(val) => {
                                setPin(val);
                                if (error) setError('');
                            }}
                            error={error}
                            autoFocus
                            showVisibilityToggle
                            label=""
                            placeholder="******"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || pin.length < 4}
                            className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('confirm')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
