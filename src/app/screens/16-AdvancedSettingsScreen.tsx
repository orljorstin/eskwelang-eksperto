import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, AlertTriangle, Database } from 'lucide-react';
import localforage from '../../lib/localforage';
import { PinModal } from '../components/PinModal';
import { useApp } from '../context/AppContext';
import { useT } from '../../context/LanguageContext';

export function AdvancedSettingsScreen() {
    const navigate = useNavigate();
    const { logout } = useApp();
    const { t } = useT();
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    const handleResetData = async () => {
        try {
            await localforage.clear();
            logout();
            window.location.reload();
        } catch (error) {
            console.error("Failed to reset data", error);
        }
    };

    return (
        <div className="h-full bg-gray-50 flex flex-col">
            <PinModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onSuccess={handleResetData}
                title={t('factoryReset')}
                description={t('factoryResetWarning')}
            />

            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{t('advanced')}</h1>
                    <p className="text-sm text-gray-600">{t('dangerZoneSystem')}</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {/* System Info */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Database className="w-4 h-4 text-gray-500" />
                        {t('systemInfo')}
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">App Version</span>
                            <span className="font-mono text-gray-900">1.0.0-beta</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Build ID</span>
                            <span className="font-mono text-gray-900">20260214</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Storage</span>
                            <span className="font-mono text-gray-900">Local (IndexedDB)</span>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div>
                    <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 px-1">{t('dangerZone')}</h3>
                    <div className="bg-red-50 rounded-xl border border-red-200 overflow-hidden">
                        <button
                            onClick={() => setIsResetModalOpen(true)}
                            className="w-full p-4 flex items-center gap-4 hover:bg-red-100/50 transition-colors text-left"
                        >
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                <Trash2 className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-red-900">{t('resetAllData')}</div>
                                <div className="text-xs text-red-700 mt-0.5">
                                    {t('resetDesc')}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
                    <p>
                        {t('resetWarningDetails')}
                    </p>
                </div>

            </div>
        </div>
    );
}
