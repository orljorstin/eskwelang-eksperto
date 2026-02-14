import { useState, useEffect, useCallback } from 'react';

export function useWakeLock() {
    const [isSupported, setIsSupported] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

    useEffect(() => {
        if ('wakeLock' in navigator) {
            setIsSupported(true);
        }
    }, []);

    const requestLock = useCallback(async () => {
        if (!isSupported) return;
        try {
            const lock = await navigator.wakeLock.request('screen');
            setWakeLock(lock);
            setIsLocked(true);

            lock.addEventListener('release', () => {
                setIsLocked(false);
                setWakeLock(null);
            });
        } catch (err) {
            console.error('Wake Lock request failed:', err);
        }
    }, [isSupported]);

    const releaseLock = useCallback(async () => {
        if (wakeLock) {
            try {
                await wakeLock.release();
                setWakeLock(null);
                setIsLocked(false);
            } catch (err) {
                console.error('Wake Lock release failed:', err);
            }
        }
    }, [wakeLock]);

    // Re-acquire lock if visibility changes (e.g. tab switch)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && isLocked) {
                requestLock();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isLocked, requestLock]);

    return { isSupported, isLocked, requestLock, releaseLock };
}
