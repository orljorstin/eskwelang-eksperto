import { useEffect, useState } from 'react';
import localforage from '../lib/localforage';
import { supabase } from '../lib/supabase';
import { User, Profile } from '../app/context/AppContext';

export function useSync() {
    const [isSyncing, setIsSyncing] = useState(false);
    const [pendingCount, setPendingCount] = useState(0);

    const syncPending = async () => {
        if (!navigator.onLine || isSyncing) return;
        setIsSyncing(true);

        try {
            const keys = await localforage.keys();
            let count = 0;

            // 1. Sync Users first (Parents)
            for (const key of keys) {
                if (key.startsWith('user_') || key === 'pending_signup') {
                    const user = await localforage.getItem<User>(key);
                    if (user && user._syncStatus === 'pending') {
                        count++;
                        const { error } = await supabase.from('users').upsert({
                            id: user.id,
                            full_name: user.full_name,
                            mobile: user.mobile,
                            pin_hash: user.pin_hash,
                            created_at: user.created_at,
                            updated_at: user.updated_at
                        });

                        if (!error) {
                            user._syncStatus = 'synced';
                            await localforage.setItem(key, user);
                            // If this was pending_signup, also save as verified_user
                            if (key === 'pending_signup') {
                                await localforage.setItem('verified_user', user);
                                await localforage.removeItem('pending_signup');
                            }
                        } else {
                            console.error('Sync error user:', error);
                        }
                    }
                }
            }

            // 2. Sync Profiles (Children)
            for (const key of keys) {
                if (key.startsWith('profile_')) {
                    const profile = await localforage.getItem<Profile>(key);
                    if (profile && profile._syncStatus === 'pending') {
                        count++;
                        // Remap parent ID if needed
                        let userId = profile.user_id;
                        if (profile._originalParentId) {
                            // Check if parent is now synced and has real ID (if it changed, but here we kept UUIDs stable)
                            // In our logic, we generate UUIDs offline, so they ARE the real IDs.
                            // So we just need to ensure the parent Record exists in Supabase first (which step 1 does).
                            userId = profile.user_id;
                        }

                        const { error } = await supabase.from('profiles').upsert({
                            id: profile.id,
                            user_id: userId,
                            name: profile.name,
                            role: profile.role,
                            avatar: profile.avatar,
                            age: profile.age,
                            settings: profile.settings || {},
                            created_at: profile.created_at,
                            updated_at: profile.updated_at
                        });

                        if (!error) {
                            profile._syncStatus = 'synced';
                            delete profile._originalParentId; // Cleanup
                            await localforage.setItem(key, profile);
                        } else {
                            console.error('Sync error profile:', error);
                        }
                    }
                }
            }

            setPendingCount(count);

        } catch (err) {
            console.error('Sync process failed:', err);
        } finally {
            setIsSyncing(false);
        }
    };

    useEffect(() => {
        const handleOnline = () => syncPending();
        window.addEventListener('online', handleOnline);

        // Initial sync check
        syncPending();

        // Periodic check
        const interval = setInterval(syncPending, 30000);

        return () => {
            window.removeEventListener('online', handleOnline);
            clearInterval(interval);
        };
    }, []);

    return { isSyncing, pendingCount };
}
