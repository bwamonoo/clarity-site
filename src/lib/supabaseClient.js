import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create real Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection (optional)
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('services').select('*').limit(1)
    if (error) throw error
    console.log('✅ Supabase connected successfully')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
    return false
  }
}