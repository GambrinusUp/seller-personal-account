import { Button, Card, Collapse, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { countNumberProducts } from '../../helpers/countNumberProducts';
import { formatDateTime } from '../../helpers/formatDateTime';
import OrderStatusLabels from '../../utils/orderStatus';
import { Order } from '../../utils/types';
import OrderItemCard from '../OrderItemCard/OrderItemCard';

interface OrderCardProps {
    details: Order;
    onOpenModal: () => void;
}

function OrderCard({ details, onOpenModal }: OrderCardProps) {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ maxWidth: 1000, width: '100%' }}
        >
            <Stack align="flex-start" justify="center" gap="md">
                <Group justify="space-between" w={'100%'}>
                    <Text>Заказ номер: {details.id}</Text>
                    <Text>Создан: {formatDateTime(details.createdAt)}</Text>
                </Group>
                <Text>
                    Количество товаров: {countNumberProducts(details.items)}
                </Text>
                <Text>Стоимость заказа: {details.total} ₽</Text>
                <Group justify="space-between" w={'100%'}>
                    <Text>
                        Статус заказа: {OrderStatusLabels[details.status]}
                    </Text>
                    <Button variant="outline" onClick={onOpenModal}>
                        Изменить статус заказа
                    </Button>
                </Group>
                <Button onClick={toggle}>Показать товары</Button>
                <Collapse
                    in={opened}
                    transitionDuration={500}
                    transitionTimingFunction="linear"
                    w={'100%'}
                    bg={'gray.1'}
                    p={'md'}
                >
                    <Stack align="flex-start" justify="center" gap="md">
                        {details.items.map((item) => (
                            <OrderItemCard key={item.id} item={item} />
                        ))}
                    </Stack>
                </Collapse>
            </Stack>
        </Card>
    );
}

export default OrderCard;
