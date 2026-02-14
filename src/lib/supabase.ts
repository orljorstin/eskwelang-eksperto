import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');


// Database types interfaces (matches schema)
export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string; // uuid
                    full_name: string | null;
                    mobile: string | null;
                    pin_hash: string | null;
                    created_at: string; // timestamptz
                    updated_at: string; // timestamptz
                };
                Insert: {
                    id?: string;
                    full_name?: string | null;
                    mobile?: string | null;
                    pin_hash?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    full_name?: string | null;
                    mobile?: string | null;
                    pin_hash?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            // Add other table types as we implement them
        };
    };
}
