import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Baby, Check, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useT } from '../../context/LanguageContext';
import { AVATARS } from '../../constants/avatars';

export function CreateProfileScreen() {
    const { createProfile } = useApp();
    const navigate = useNavigate();
    const { t } = useT();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState(AVATARS[0]);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !age) return;

        setIsLoading(true);
        try {
            await createProfile({
                name,
                age: parseInt(age),
                avatar,
                role: 'child',
                settings: { allowed_apps: [] } // Default empty settings
            });
            navigate('/profile-management'); // Go back to profile management
        } catch (error) {
            console.error('Failed to create profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-gray-900 text-white relative overflow-hidden border-b border-gray-800 flex items-center gap-3">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-teal-600/30 rounded-full blur-3xl mix-blend-screen" />
                    <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-purple-600/30 rounded-full blur-3xl mix-blend-screen" />
                </div>
                <div className="relative z-10 flex items-center gap-3 w-full">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-400 hover:text-white" />
                    </button>
                    <h1 className="text-xl font-bold text-white">{t('addChildProfile')}</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
                <form onSubmit={handleCreate} className="space-y-8">

                    {/* Avatar Selection */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                            {t('chooseAvatar')}
                        </label>
                        <div className="flex flex-wrap justify-center gap-4">
                            {AVATARS.map((a) => (
                                <button
                                    key={a}
                                    type="button"
                                    onClick={() => setAvatar(a)}
                                    className={`w-14 h-14 text-3xl flex items-center justify-center rounded-full transition-all ${avatar === a
                                        ? 'bg-teal-100 ring-4 ring-teal-500/30 scale-110'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                >
                                    {a}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">{t('childNameLabel')}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Miguel"
                                    className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                                    required
                                />
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">{t('ageLabel')}</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="e.g. 10"
                                    min="3"
                                    max="18"
                                    className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                                    required
                                />
                                <Baby className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !name || !age}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                <Check className="w-5 h-6" />
                                {t('addChildProfile')}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
