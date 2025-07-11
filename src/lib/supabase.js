import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qajyrxkbznodialrscfb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhanlyeGtiem5vZGlhbHJzY2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNzE3MDcsImV4cCI6MjA2Nzg0NzcwN30.HkUB-t6hxUf9HYIgRi94tlw_W9QTT2AwbBqN2E2RZcw";

export const supabase = createClient(supabaseUrl, supabaseKey);