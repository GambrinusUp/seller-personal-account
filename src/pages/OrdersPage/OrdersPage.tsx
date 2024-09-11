import { Flex, Loader } from '@mantine/core';
import { useState } from 'react';

import OrderCard from '../../components/OrderCard/OrderCard';
import OrderFilter from '../../components/OrderFilter/OrderFilter';
import OrderStatusModal from '../../components/OrderStatusModal/OrderStatusModal';
import { useOrders } from '../../hooks/useOrders';
import { Order } from '../../utils/types';

function OrdersPage() {
    const {
        filteredOrders,
        selectedStatus,
        setSelectedStatus,
        selectedSort,
        setSelectedSort,
        handleChangeOrderStatus,
        loading,
    } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [modalOpened, setModalOpened] = useState<boolean>(false);

    const openModal = (order: Order) => {
        setSelectedOrder(order);
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
        setSelectedOrder(null);
    };

    if (loading)
        return (
            <Flex
                justify="center"
                align="center"
                mt="md"
                mb="md"
                direction="column"
            >
                <Loader color="blue" />
            </Flex>
        );

    return (
        <>
            <Flex
                justify="center"
                align="center"
                mt="md"
                mb="md"
                gap="md"
                direction="column"
            >
                <OrderFilter
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                />
                {filteredOrders &&
                    filteredOrders.map((order) => (
                        <OrderCard
                            key={order.id}
                            details={order}
                            onOpenModal={() => openModal(order)}
                        />
                    ))}
            </Flex>
            {selectedOrder && (
                <OrderStatusModal
                    id={selectedOrder.id}
                    currentStatus={selectedOrder.status}
                    opened={modalOpened}
                    close={closeModal}
                    onSave={handleChangeOrderStatus}
                />
            )}
        </>
    );
}

export default OrdersPage;
