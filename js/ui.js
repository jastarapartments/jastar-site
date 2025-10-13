// js/ui.js
import { fetchRooms } from './supabase.js';

/**
 * Рендерит карточку комнаты
 * @param {Object} room
 * @returns {string} HTML-строка
 */
function renderRoomCard(room) {
    // Используем slug для ссылки и плейсхолдеры для фото, пока не загружены реальные URL из Supabase Storage
    const imageUrl = room.images && room.images.length > 0 
                     ? room.images[0].url 
                     : `/images/${room.slug.includes('2-bed') ? 'room-2-1.jpg' : room.slug.includes('3-bed') ? 'room-3-1.jpg' : 'room-single.jpg'}`;

    return `
        <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <img 
                src="${imageUrl}" 
                alt="Фото: ${room.title}" 
                class="w-full h-56 object-cover" 
            />
            <div class="p-4">
                <h3 class="text-xl font-bold text-gray-900">${room.title}</h3>
                <p class="mt-1 text-sm text-gray-500">
                    Мест: ${room.capacity} • Депозит: 40 000 ₸ • 
                    Удобства: ${room.amenities ? room.amenities.slice(0, 2).join(', ') : 'Нет данных'}...
                </p>
                
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-2xl font-extrabold text-blue-600">
                        ${room.price_monthly.toLocaleString('ru-KZ')} ₸/мес
                    </span>
                    <a 
                        href="/room.html?slug=${room.slug}"
                        class="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition"
                    >
                        Подробнее
                    </a>
                </div>
            </div>
        </article>
    `;
}

/**
 * Загружает и рендерит список комнат на странице rooms.html
 */
export async function loadRoomsPage() {
    const roomsContainer = document.getElementById('rooms-container');
    if (!roomsContainer) return;
    
    roomsContainer.innerHTML = '<p class="text-center text-lg text-gray-500">Загрузка комнат...</p>';
    
    const rooms = await fetchRooms();
    
    if (rooms.length === 0) {
        roomsContainer.innerHTML = '<p class="text-center text-lg text-red-500">Комнаты не найдены или ошибка загрузки.</p>';
        return;
    }

    roomsContainer.innerHTML = rooms.map(renderRoomCard).join('');
}

// Загрузка комнат при инициализации rooms.html
if (document.getElementById('rooms-container')) {
    document.addEventListener('DOMContentLoaded', loadRoomsPage);
}
