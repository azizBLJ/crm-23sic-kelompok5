import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://esjemvvoabbedjywoxfd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzamVtdnZvYWJiZWRqeXdveGZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNzc0MDUsImV4cCI6MjA2NTk1MzQwNX0.hshGTtGWXo2PThp0NgPGy4FurZqlAeUmfi2cG4CoIAA'

export const supabase = createClient(supabaseUrl, supabaseKey)