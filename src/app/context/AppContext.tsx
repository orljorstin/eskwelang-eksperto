import React, { createContext, useContext, useEffect, useState } from 'react';
import localforage from '../../lib/localforage';
import { PENDING_SIGNUP_KEY, VERIFIED_USER_KEY, USERS_STORE, PROFILES_STORE, SESSIONS_STORE } from '../../lib/localforage';
import { supabase } from '../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

// Types (Move to a types file later if needed)
export type User = {
    id: string;
    full_name: string;
    mobile: string;
    pin_hash: string;
    created_at?: string;
    updated_at?: string;
    _syncStatus?: 'pending' | 'synced' | 'error';
};

export type Profile = {
    id: string;
    user_id: string;
    name: string;
    role: 'parent' | 'child' | 'guest';
    avatar: string;
    age?: number;
    settings?: any;
    created_at?: string;
    updated_at?: string;
    _syncStatus?: 'pending' | 'synced' | 'error';
    _originalParentId?: string; // For remapping
};

// Spending Limits Type
export type SpendingLimits = {
    weekly_limit: number;
    pin_threshold: number;
    require_pin: boolean;
};

const DEFAULT_LIMITS: SpendingLimits = {
    weekly_limit: 500,
    pin_threshold: 100,
    require_pin: true
};

const SPENDING_LIMITS_KEY = 'spending_limits';

type AppContextType = {
    user: User | null;
    profiles: Profile[];
    spendingLimits: SpendingLimits;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (pin: string) => Promise<{ success: boolean; message?: string }>;
    loginWithMobile: (mobile: string, pin: string) => Promise<{ success: boolean; message?: string }>;
    verifyPin: (pin: string) => Promise<boolean>;
    signup: (fullname: string, mobile: string, pin: string) => Promise<void>;
    logout: () => void;
    createProfile: (profile: Omit<Profile, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
    updateProfile: (profile: Profile) => Promise<void>;
    updateSpendingLimits: (limits: SpendingLimits) => Promise<void>;
    makePurchase: (amount: number, description: string) => Promise<{ success: boolean; message?: string }>;
    spentThisWeek: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [spendingLimits, setSpendingLimits] = useState<SpendingLimits>(DEFAULT_LIMITS);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initial Load
    useEffect(() => {
        const init = async () => {
            try {
                // Check for verified user first
                const verifiedUser = await localforage.getItem<User>(VERIFIED_USER_KEY);
                if (verifiedUser) {
                    setUser(verifiedUser);
                } else {
                    // Check for pending signup
                    const pendingUser = await localforage.getItem<User>(PENDING_SIGNUP_KEY);
                    if (pendingUser) {
                        setUser(pendingUser);
                    }
                }

                // Load profiles if user exists
                if (user) {
                    await loadProfiles();
                    await loadSpendingLimits();
                }
            } catch (error) {
                console.error('Failed to initialize app:', error);
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, [user?.id]); // Reload if user ID changes

    const loadSpendingLimits = async () => {
        const limits = await localforage.getItem<SpendingLimits>(SPENDING_LIMITS_KEY);
        if (limits) {
            setSpendingLimits(limits);
        }
    };

    const updateSpendingLimits = async (limits: SpendingLimits) => {
        await localforage.setItem(SPENDING_LIMITS_KEY, limits);
        setSpendingLimits(limits);
    };

    const loadProfiles = async () => {
        // In a real app with localforage, we might need to iterate keys or maintain a list
        // For now, let's assume we store profiles in a single array or iterate
        // Implementation of retrieving all profiles from localforage:
        const keys = await localforage.keys();
        const loadedProfiles: Profile[] = [];
        for (const key of keys) {
            if (key.startsWith('profile_')) {
                const profile = await localforage.getItem<Profile>(key);
                if (profile) loadedProfiles.push(profile);
            }
        }
        setProfiles(loadedProfiles);
    };

    const signup = async (full_name: string, mobile: string, pin: string) => {
        const salt = await bcrypt.genSalt(10);
        const pin_hash = await bcrypt.hash(pin, salt);

        // Generate temp ID
        const id = uuidv4();

        const newUser: User = {
            id,
            full_name,
            mobile,
            pin_hash,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            _syncStatus: 'pending'
        };

        // Save as pending signup
        await localforage.setItem(PENDING_SIGNUP_KEY, newUser);
        // Also save to users list for redundancy
        await localforage.setItem(`user_${id}`, newUser);

        setUser(newUser);
        // Auto-login (authenticated = true) after signup? Or require login?
        // Let's require login to verify PIN memory
    };

    const login = async (pin: string): Promise<{ success: boolean; message?: string }> => {
        if (!user) return { success: false, message: 'No user found' };

        // Strict Requirement: Pending users cannot login until synced
        if (user._syncStatus === 'pending') {
            return {
                success: false,
                message: 'Please connect to internet to complete setup.'
            };
        }

        const isValid = await bcrypt.compare(pin, user.pin_hash);
        if (isValid) {
            setIsAuthenticated(true);
            return { success: true };
        } else {
            return { success: false, message: 'Invalid PIN' };
        }
    };

    // Full Login for new devices or cleared cache
    const loginWithMobile = async (mobile: string, pin: string): Promise<{ success: boolean; message?: string }> => {
        try {
            // 1. Check online first
            if (!navigator.onLine) {
                return { success: false, message: 'Need internet to find account.' };
            }

            // 2. Query Supabase
            const { data: users, error } = await supabase
                .from('users')
                .select('*')
                .eq('mobile', mobile)
                .limit(1);

            if (error) throw error;
            if (!users || users.length === 0) {
                return { success: false, message: 'Account not found.' };
            }

            const foundUser = users[0];

            // 3. Verify PIN
            // Note: In a real app, hash verification should happen on server (RPC), 
            // but for this offline-first architecture, we verify here to keep logic consistent.
            const isValid = await bcrypt.compare(pin, foundUser.pin_hash || '');

            if (!isValid) {
                return { success: false, message: 'Invalid PIN.' };
            }

            // 4. Success! Save as verified_user for future offline access
            const localUser: User = {
                id: foundUser.id,
                full_name: foundUser.full_name || 'Apps',
                mobile: foundUser.mobile || '',
                pin_hash: foundUser.pin_hash || '',
                created_at: foundUser.created_at,
                updated_at: foundUser.updated_at,
                _syncStatus: 'synced'
            };

            await localforage.setItem(VERIFIED_USER_KEY, localUser);
            setUser(localUser);
            setIsAuthenticated(true);

            // Trigger profile download (fire and forget)
            downloadProfiles(foundUser.id);

            return { success: true };

        } catch (err: any) {
            console.error('Login error:', err);

            // Handle network/fetch errors specifically (checking includes for broader match)
            const errorMsg = err.message || err.toString();
            if (
                errorMsg.includes('fetch') ||
                errorMsg.includes('Network') ||
                errorMsg.includes('Failed to load') ||
                err.name === 'TypeError'
            ) {
                return {
                    success: false,
                    message: 'Unable to connect to server. Use "Switch Account" only when online.'
                };
            }

            return { success: false, message: errorMsg || 'Login failed.' };
        }
    };

    const verifyPin = async (pin: string): Promise<boolean> => {
        if (!user) return false;
        return await bcrypt.compare(pin, user.pin_hash);
    };

    const downloadProfiles = async (userId: string) => {
        const { data: profiles } = await supabase.from('profiles').select('*').eq('user_id', userId);
        if (profiles) {
            for (const p of profiles) {
                const localProfile: Profile = {
                    ...p,
                    _syncStatus: 'synced'
                };
                await localforage.setItem(`profile_${p.id}`, localProfile);
            }
            // Update state if needed, or rely on next reload/init
            // For immediate UI update:
            // loadProfiles(); // This might collide with state updates, better to let it be or carefully update.
            // Let's manually map and set to ensure consistency
            const mappedProfiles: Profile[] = profiles.map(p => ({ ...p, _syncStatus: 'synced' }));
            setProfiles(mappedProfiles);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        // user state remains (just locked)
    };

    const createProfile = async (profileData: Omit<Profile, 'id' | 'user_id'>) => {
        if (!user) return;

        const id = uuidv4();
        const newProfile: Profile = {
            ...profileData,
            id,
            user_id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            _syncStatus: 'pending',
            _originalParentId: user._syncStatus === 'pending' ? user.id : undefined
        };

        await localforage.setItem(`profile_${id}`, newProfile);
        setProfiles(prev => [...prev, newProfile]);
    };

    const updateProfile = async (updatedProfile: Profile) => {
        const profileWithSync = {
            ...updatedProfile,
            updated_at: new Date().toISOString(),
            _syncStatus: 'pending' as const
        };

        await localforage.setItem(`profile_${updatedProfile.id}`, profileWithSync);

        setProfiles(prev => prev.map(p => p.id === updatedProfile.id ? profileWithSync : p));
    };

    const [spentThisWeek, setSpentThisWeek] = useState(0);

    // Load spent amount
    useEffect(() => {
        localforage.getItem<number>('spent_this_week').then(val => {
            if (val) setSpentThisWeek(val);
        });
    }, []);

    const makePurchase = async (amount: number, description: string): Promise<{ success: boolean; message?: string }> => {
        // 1. Check Limits
        if (spendingLimits.weekly_limit > 0 && (spentThisWeek + amount) > spendingLimits.weekly_limit) {
            return { success: false, message: `Weekly limit reached! (Used: ${spentThisWeek}/${spendingLimits.weekly_limit})` };
        }

        // 2. PIN Threshold is handled by UI before calling this, or we can return 'require_pin' status?
        // Actually, let's just record the transaction for the prototype
        const newTotal = spentThisWeek + amount;
        setSpentThisWeek(newTotal);
        await localforage.setItem('spent_this_week', newTotal);

        // Optional: Log audit log locally
        return { success: true, message: `Purchased ${description} for ₱${amount}!` };
    };

    return (
        <AppContext.Provider value={{
            user,
            profiles,
            spendingLimits,
            isLoading,
            isAuthenticated,
            login,
            loginWithMobile,
            verifyPin,
            signup,
            logout,
            createProfile,
            updateProfile,
            updateSpendingLimits,
            makePurchase, // New export
            spentThisWeek
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
