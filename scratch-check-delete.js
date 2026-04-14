import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dodrqvdljiflfcpxyqqo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvZHJxdmRsamlmbGZjcHh5cXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2OTg4MTksImV4cCI6MjA3NTI3NDgxOX0.3S_GcDkAS9WMewnpPkxdbVKnpuh7ZLw2ULkKaecAobE'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testDelete() {
  // get one appointment
  const { data: apts, error: selErr } = await supabase.from('appointments').select('*').limit(1)
  console.log('Select:', apts, selErr)
  
  if (apts && apts.length > 0) {
    const id = apts[0].id
    console.log('Attempting to delete ID:', id)
    
    // try to delete it
    const { data, error } = await supabase.from('appointments').delete().eq('id', id).select()
    console.log('Delete result data:', data)
    console.log('Delete result error:', error)
  }
}

testDelete()
