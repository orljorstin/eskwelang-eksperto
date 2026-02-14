import localforage from 'localforage';

localforage.config({
    name: 'Eskwelang-Eksperto',
    storeName: 'eskwela_db',
    description: 'Offline storage for Eskwelang-Eksperto PWA'
});

export const USERS_STORE = 'users';
export const PROFILES_STORE = 'profiles';
export const SESSIONS_STORE = 'sessions';
export const SETTINGS_STORE = 'settings';
export const AUDIT_LOGS_STORE = 'audit_logs';

export const PENDING_SIGNUP_KEY = 'pending_signup';
export const VERIFIED_USER_KEY = 'verified_user';

export default localforage;
