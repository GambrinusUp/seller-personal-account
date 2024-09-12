import { Group, Select } from '@mantine/core';

import { OrderStatus } from '../../utils/types';

interface OrderFilterProps {
    selectedStatus: string | null;
    setSelectedStatus: (status: string | null) => void;
    selectedSort: string | null;
    setSelectedSort: (sort: string | null) => void;
}

function OrderFilter({
    selectedStatus,
    setSelectedStatus,
    selectedSort,
    setSelectedSort,
}: OrderFilterProps) {
    return (
        <Group>
            <Select
                label="Сортировка по статусу"
                value={selectedStatus}
                onChange={setSelectedStatus}
                radius="md"
                data={[
                    {
                        value: '-1',
                        label: 'Без сортировки',
                    },
                    {
                        value: String(OrderStatus.Created),
                        label: 'Создан',
                    },
                    {
                        value: String(OrderStatus.Paid),
                        label: 'Оплачен',
                    },
                    {
                        value: String(OrderStatus.Transport),
                        label: 'В пути',
                    },
                    {
                        value: String(OrderStatus.DeliveredToThePoint),
                        label: 'Доставлен в пункт выдачи',
                    },
                    {
                        value: String(OrderStatus.Received),
                        label: 'Доставлен',
                    },
                    {
                        value: String(OrderStatus.Archived),
                        label: 'Архивирован',
                    },
                    {
                        value: String(OrderStatus.Refund),
                        label: 'Возвращён',
                    },
                ]}
                allowDeselect={false}
            />
            <Select
                label="Сортировка по сумме заказа"
                value={selectedSort}
                onChange={setSelectedSort}
                radius="md"
                data={[
                    { label: 'Без сортировки', value: '-1' },
                    { label: 'По возрастанию', value: 'asc' },
                    { label: 'По убыванию', value: 'desc' },
                ]}
                allowDeselect={false}
            />
        </Group>
    );
}

export default OrderFilter;
