import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajzapbqylesxnslvcvrx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqemFwYnF5bGVzeG5zbHZjdnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2Njg5MDEsImV4cCI6MjA3MTI0NDkwMX0.CCZTMe-gvZwUafub00OWpaF-jSG3KI43dwSTfxA3SZg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
