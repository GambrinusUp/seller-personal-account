import { Order } from '../utils/types';

const API_URL = 'http://localhost:8000/orders';

export const fetchOrders = async (status?: string): Promise<Order[]> => {
    const url = status ? `${API_URL}?status=${status}` : API_URL;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке заказов');
    }
    return response.json();
};

export const updateOrderStatus = async (
    id: string,
    newStatus: number
): Promise<Order> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
    });
    if (!response.ok) {
        throw new Error('Ошибка при изменении статуса заказа');
    }
    return response.json();
};
