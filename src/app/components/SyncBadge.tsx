import { RefreshCw, CloudOff, CheckCircle } from 'lucide-react';

interface SyncBadgeProps {
    isSyncing: boolean;
    pendingCount: number;
}

export function SyncBadge({ isSyncing, pendingCount }: SyncBadgeProps) {
    if (pendingCount === 0 && !isSyncing) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg text-xs font-medium animate-in fade-in slide-in-from-top-4">
            {isSyncing ? (
                <>
                    <RefreshCw className="w-3 h-3 text-teal-600 animate-spin" />
                    <span className="text-teal-700">Syncing...</span>
                </>
            ) : pendingCount > 0 ? (
                <>
                    <CloudOff className="w-3 h-3 text-amber-500" />
                    <span className="text-amber-700">{pendingCount} unsynced</span>
                </>
            ) : (
                <>
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-green-700">Synced</span>
                </>
            )}
        </div>
    );
}
