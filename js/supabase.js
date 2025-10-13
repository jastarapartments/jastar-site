// === supabase.js ===

// Подключение библиотеки (если через CDN)
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// === ТВОИ ДАННЫЕ ===
const SUPABASE_URL = "https://qlfcgurrhmvkefzcuegu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZmNndXJyaG12a2VmemN1ZWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMzg1NTAsImV4cCI6MjA3NTkxNDU1MH0.d7pBbxjxIjfXfP8mlyU7lERzZXv4wXMGqC8Dpc6WT88"; // ← вставь сюда свой ключ

// === ИНИЦИАЛИЗАЦИЯ ===
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

