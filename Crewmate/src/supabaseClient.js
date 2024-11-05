// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://adjiatixjotyrrskqmwp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkamlhdGl4am90eXJyc2txbXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3OTA0MjQsImV4cCI6MjA0NjM2NjQyNH0.4wV4TA0Ba6KZNei3wQmekLlCuQaAjsx-DbUvGV0J1W4';

export const supabase = createClient(supabaseUrl, supabaseKey);
