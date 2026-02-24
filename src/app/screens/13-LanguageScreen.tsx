import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useT } from '../../context/LanguageContext';

const LANGUAGES = [
    { code: 'tl', name: 'Taglish', description: 'Filipino + English (Recommended)' },
    { code: 'ceb', name: 'Bisaya', description: 'Cebuano (Visayas/Mindanao)' },
    { code: 'bcl', name: 'Bicol', description: 'Central Bikol (Bicolandia)' },
    { code: 'en', name: 'English', description: 'Standard English' },
];

export function LanguageScreen() {
    const navigate = useNavigate();
    const { language, setLanguage, t } = useT();
    const [selected, setSelected] = useState(language);

    const handleApply = () => {
        setLanguage(selected);
        navigate(-1);
    };

    return (
        <div className="h-full bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-gray-900 text-white relative overflow-hidden flex items-center gap-3 border-b border-gray-800">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-teal-600/30 rounded-full blur-3xl mix-blend-screen" />
                    <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-purple-600/30 rounded-full blur-3xl mix-blend-screen" />
                </div>
                <div className="relative z-10 flex items-center gap-3 w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-400 hover:text-white" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-white">{t('language')}</h1>
                        <p className="text-sm text-gray-400">{t('selectLanguage')}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 relative">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 mb-20">
                    {LANGUAGES.map((lang, idx) => (
                        <button
                            key={lang.code}
                            onClick={() => setSelected(lang.code as any)}
                            className={`w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${idx !== LANGUAGES.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === lang.code ? 'border-teal-600' : 'border-gray-300'
                                }`}>
                                {selected === lang.code && <div className="w-3 h-3 bg-teal-600 rounded-full" />}
                            </div>
                            <div className="flex-1 text-left">
                                <p className={`font-medium ${selected === lang.code ? 'text-teal-700' : 'text-gray-900'}`}>
                                    {lang.name}
                                </p>
                                <p className="text-sm text-gray-500">{lang.description}</p>
                            </div>
                            {selected === lang.code && <Check className="w-5 h-5 text-teal-600" />}
                        </button>
                    ))}
                </div>

                <p className="text-xs text-center text-gray-500 mb-24">
                    More languages coming soon!
                </p>

                {/* Floating Save Button */}
                <div className="absolute bottom-6 left-6 right-6">
                    <button
                        onClick={handleApply}
                        className="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-all hover:bg-teal-700"
                    >
                        {t('applyChanges')}
                    </button>
                </div>
            </div>
        </div>
    );
}
