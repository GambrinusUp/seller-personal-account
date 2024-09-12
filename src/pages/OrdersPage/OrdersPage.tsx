import { Flex, Loader, Pagination, Select } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import OrderCard from '../../components/OrderCard/OrderCard';
import OrderFilter from '../../components/OrderFilter/OrderFilter';
import OrderStatusModal from '../../components/OrderStatusModal/OrderStatusModal';
import { useOrders } from '../../hooks/useOrders';
import { Order } from '../../utils/types';

function OrdersPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const advertisementId = params.get('advertisementId');
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
    const { scrollIntoView } = useScrollIntoView();
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(10);
    const [filteredByAdOrders, setFilteredByAdOrders] = useState<Order[]>([]);

    const openModal = (order: Order) => {
        setSelectedOrder(order);
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
        setSelectedOrder(null);
    };

    useEffect(() => {
        if (advertisementId) {
            const ordersWithAd = filteredOrders.filter((order) =>
                order.items.some((item) => item.id === advertisementId)
            );
            setFilteredByAdOrders(ordersWithAd);
        } else {
            setFilteredByAdOrders(filteredOrders);
        }
    }, [advertisementId, filteredOrders]);

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

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredByAdOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );

    const handlePageChange = (page: number | null) => {
        if (page) {
            setCurrentPage(page);
            scrollIntoView({ alignment: 'start' });
        }
    };

    const handleOrdersPerPageChange = (value: string | null) => {
        if (value) {
            setOrdersPerPage(Number(value));
            setCurrentPage(1);
        }
    };

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
                <Select
                    label="Заказов на странице"
                    placeholder="Выберите количество"
                    data={['10', '25', '50']}
                    radius="md"
                    value={ordersPerPage.toString()}
                    onChange={handleOrdersPerPageChange}
                />
                {currentOrders.length > 0
                    ? currentOrders.map((order) => (
                          <OrderCard
                              key={order.id}
                              details={order}
                              onOpenModal={() => openModal(order)}
                          />
                      ))
                    : 'Нет заказов'}
            </Flex>
            <Flex justify="center" align="center" mt="md">
                <Pagination
                    value={currentPage}
                    onChange={handlePageChange}
                    total={Math.ceil(filteredOrders.length / ordersPerPage)}
                />
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
