
// js/auth.js
import { supabase } from './supabase.js';

/**
 * Проверяет, авторизован ли пользователь. Если да, перенаправляет на /dashboard.html.
 */
export async function checkSessionAndRedirect() {
    const { data: { session } } = await supabase.auth.getSession();
    const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html');
    
    if (session && isAuthPage) {
        // Если авторизован и находится на странице входа/регистрации, перенаправить
        window.location.href = '/dashboard.html'; 
    } else if (!session && window.location.pathname.includes('dashboard.html')) {
        // Если не авторизован, но пытается попасть в кабинет, перенаправить на вход
        window.location.href = '/login.html'; 
    }
    return session;
}

/**
 * Регистрация нового пользователя
 * @param {string} email 
 * @param {string} password 
 */
export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    return { data, error };
}

/**
 * Вход пользователя
 * @param {string} email 
 * @param {string} password 
 */
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
}

/**
 * Выход пользователя
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.href = '/login.html';
    }
}

// Глобальная логика проверки при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    checkSessionAndRedirect();
});
