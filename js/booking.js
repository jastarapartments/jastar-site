// js/booking.js
import { supabase } from './supabase.js';

/**
 * Создает новую бронь в базе данных
 * @param {number} room_id
 * @param {Date} check_in 
 * @param {Date} check_out 
 * @param {number} total_amount 
 */
export async function createBooking(room_id, check_in, check_out, total_amount) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        alert('Для бронирования необходимо войти в систему.');
        window.location.href = '/login.html';
        return { error: { message: 'User not logged in' } };
    }

    const { data, error } = await supabase
        .from('bookings')
        .insert([
            {
                user_id: user.id,
                room_id,
                check_in: check_in.toISOString().split('T')[0],
                check_out: check_out.toISOString().split('T')[0],
                total_amount,
                status: 'pending' // Статус ожидает оплаты/подтверждения
            },
        ]);
    
    if (error) {
        console.error('Ошибка создания брони:', error.message);
        return { error };
    }

    // Здесь должен быть переход к Kaspi-оплате, пока это плейсхолдер
    alert(`Бронь #${data[0].id} создана! Перенаправление на оплату Kaspi... (placeholder)`);
    return { data };
}

/**
 * Загружает историю бронирований для текущего пользователя
 */
export async function fetchUserBookings() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('bookings')
        .select(`
            *, 
            rooms (title, capacity)
        `) // Получаем данные комнаты через Join
        .eq('user_id', user.id)
        .order('check_in', { ascending: false });

    if (error) {
        console.error('Ошибка загрузки бронирований:', error.message);
        return [];
    }
    return data;
}
