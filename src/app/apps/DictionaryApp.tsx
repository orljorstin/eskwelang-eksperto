import { useState } from 'react';
import { X, Search, Volume2, BookOpen } from 'lucide-react';
import { useT } from '../../context/LanguageContext';

interface DictionaryAppProps {
    onClose: () => void;
}

// Mock dictionary data for demonstration
const MOCK_DICTIONARY: Record<string, { pos: string, def: string, ex: string }> = {
    'school': {
        pos: 'noun',
        def: 'An institution for educating children.',
        ex: 'The kids are at school.'
    },
    'learn': {
        pos: 'verb',
        def: 'Gain or acquire knowledge of or skill in (something) by study, experience, or being taught.',
        ex: 'They are learning to read.'
    },
    'focus': {
        pos: 'verb',
        def: 'Adapt to the prevailing level of light and become able to see clearly.',
        ex: 'Try to focus on your studies.'
    }
};

export function DictionaryApp({ onClose }: DictionaryAppProps) {
    const { t } = useT();
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<{ word: string, data: any } | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const searchWord = query.trim().toLowerCase();
        if (!searchWord) return;

        setIsSearching(true);

        // Simulate network delay
        setTimeout(() => {
            if (MOCK_DICTIONARY[searchWord]) {
                setResult({ word: searchWord, data: MOCK_DICTIONARY[searchWord] });
            } else {
                setResult({ word: searchWord, data: null });
            }
            setIsSearching(false);
        }, 500);
    };

    return (
        <div className="h-full w-full bg-white flex flex-col z-50 fixed inset-0">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-purple-600 shadow-md relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold">
                        📖
                    </div>
                    <span className="text-white font-bold text-lg">Kids Dictionary</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full text-purple-100 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-purple-600 px-6 pb-6 pt-2 rounded-b-3xl shadow-lg relative z-10">
                <form onSubmit={handleSearch} className="relative">
                    <div className="absolute left-4 top-3.5 text-purple-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Look up a word..."
                        className="w-full bg-white rounded-2xl py-3 pl-12 pr-4 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-inner"
                    />
                </form>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto w-full bg-gray-50 p-6">

                {isSearching ? (
                    <div className="h-full flex flex-col items-center justify-center text-purple-400 space-y-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-200 border-t-purple-600"></div>
                        <p className="font-medium animate-pulse">Searching the library...</p>
                    </div>
                ) : result ? (
                    result.data ? (
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-baseline justify-between mb-4 mt-2">
                                <h2 className="text-4xl font-black text-gray-900 capitalize tracking-tight font-serif">
                                    {result.word}
                                </h2>
                                <button className="p-3 text-purple-500 hover:bg-purple-50 rounded-full transition-colors active:scale-90">
                                    <Volume2 className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase rounded-md mb-6 tracking-wider">
                                {result.data.pos}
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Meaning</h3>
                                    <p className="text-xl text-gray-800 leading-relaxed font-medium">
                                        {result.data.def}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Example</h3>
                                    <p className="text-lg text-gray-600 italic">
                                        "{result.data.ex}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center px-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">Word not found</h3>
                            <p>We couldn't find "{result.word}" in our simple dictionary yet.</p>
                        </div>
                    )
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center px-4 opacity-70">
                        <BookOpen className="w-24 h-24 text-purple-100 mb-6" />
                        <h3 className="text-2xl font-bold text-purple-300 mb-2">Ready to learn?</h3>
                        <p className="text-purple-200/80 font-medium max-w-[200px]">Type a word above to see what it means!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
