import { createClient } from '@supabase/supabase-js'

// Using placeholders if env vars are missing to prevent 'supabaseUrl is required' crash during Netlify build.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing. Dynamic features will not work until added to Netlify settings.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
