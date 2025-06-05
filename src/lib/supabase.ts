import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ecdylxpeciuqabuayfcv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjZHlseHBlY2l1cWFidWF5ZmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjY2MDYsImV4cCI6MjA2NDYwMjYwNn0.1Zt9PmAPVfNo6_SEuOntBUo5VzavqNUM0cy6vXDiItg' // Replace with actual key

export const supabase = createClient(supabaseUrl, supabaseKey)
