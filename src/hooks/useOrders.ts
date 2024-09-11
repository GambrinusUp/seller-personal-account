import { useEffect, useState } from 'react';

import { fetchOrders, updateOrderStatus } from '../api/ordersAPI';
import { Order } from '../utils/types';
import { useNotification } from './useNotification';

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string | null>('-1');
    const [selectedSort, setSelectedSort] = useState<string | null>('-1');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showSuccess, showError } = useNotification();

    useEffect(() => {
        setLoading(true);
        fetchOrders(
            selectedStatus !== '-1' ? selectedStatus || undefined : undefined
        )
            .then((data) => {
                setOrders(data);
                setFilteredOrders(data);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [selectedStatus]);

    useEffect(() => {
        const sortedOrders = [...orders];
        if (selectedSort === 'asc') {
            sortedOrders.sort((a, b) => a.total - b.total);
        } else if (selectedSort === 'desc') {
            sortedOrders.sort((a, b) => b.total - a.total);
        }
        setFilteredOrders(sortedOrders);
    }, [selectedSort, orders]);

    const handleChangeOrderStatus = (id: string, newStatus: number) => {
        setLoading(true);
        updateOrderStatus(id, newStatus)
            .then((updatedOrder) => {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === updatedOrder.id
                            ? { ...order, status: updatedOrder.status }
                            : order
                    )
                );
                showSuccess('Статус заказа изменён');
            })
            .catch((error) => {
                setError(error.message);
                showError('Ошибка при изменении статуса заказа');
            })
            .finally(() => setLoading(false));
    };

    return {
        orders,
        filteredOrders,
        selectedStatus,
        setSelectedStatus,
        selectedSort,
        setSelectedSort,
        handleChangeOrderStatus,
        loading,
        error,
    };
}
