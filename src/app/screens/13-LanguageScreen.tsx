import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

const LANGUAGES = [
    { code: 'fil', name: 'Taglish', description: 'Filipino + English (Recommended)' },
    { code: 'en', name: 'English', description: 'Standard English' },
    { code: 'ceb', name: 'Cebuano', description: 'Bisaya' },
];

export function LanguageScreen() {
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState('fil');

    return (
        <div className="h-full bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Wika / Language</h1>
                    <p className="text-sm text-gray-600">Piliin ang lengguwahe ng app</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 relative">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 mb-20">
                    {LANGUAGES.map((lang, idx) => (
                        <button
                            key={lang.code}
                            onClick={() => setSelectedLang(lang.code)}
                            className={`w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${idx !== LANGUAGES.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedLang === lang.code ? 'border-teal-600' : 'border-gray-300'
                                }`}>
                                {selectedLang === lang.code && <div className="w-3 h-3 bg-teal-600 rounded-full" />}
                            </div>
                            <div className="flex-1 text-left">
                                <p className={`font-medium ${selectedLang === lang.code ? 'text-teal-700' : 'text-gray-900'}`}>
                                    {lang.name}
                                </p>
                                <p className="text-sm text-gray-500">{lang.description}</p>
                            </div>
                            {selectedLang === lang.code && <Check className="w-5 h-5 text-teal-600" />}
                        </button>
                    ))}
                </div>

                <p className="text-xs text-center text-gray-500 mb-24">
                    More languages coming soon!
                </p>

                {/* Floating Save Button */}
                <div className="absolute bottom-6 left-6 right-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-all hover:bg-teal-700"
                    >
                        Apply Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
