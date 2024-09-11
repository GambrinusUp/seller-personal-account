import {
    Button,
    Card,
    Collapse,
    Group,
    Image,
    Spoiler,
    Stack,
    Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

import { countNumberProducts } from '../../helpers/countNumberProducts';
import { formatDateTime } from '../../helpers/formatDateTime';
import OrderStatusLabels from '../../utils/orderStatus';
import { Order } from '../../utils/types';

interface OrderCardProps {
    details: Order;
    onOpenModal: () => void;
}

function OrderCard({ details, onOpenModal }: OrderCardProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const navigate = useNavigate();

    return (
        <>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ maxWidth: 1000, width: '100%' }}
            >
                <Stack align="flex-start" justify="center" gap="md">
                    <Group justify="space-between" w={'100%'}>
                        <span>Заказ номер: {details.id}</span>
                        <span>Создан: {formatDateTime(details.createdAt)}</span>
                    </Group>
                    <span>
                        Количество товаров: {countNumberProducts(details.items)}
                    </span>
                    <span>Стоимость заказа: {details.total} ₽</span>
                    <Group justify="space-between" w={'100%'}>
                        <span>
                            Статус заказа: {OrderStatusLabels[details.status]}
                        </span>
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
                                <Card
                                    key={item.id}
                                    p="md"
                                    w={'100%'}
                                    radius={'md'}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        navigate('/advertisement/' + item.id)
                                    }
                                >
                                    <Group justify="space-beetwen">
                                        <Image
                                            src={
                                                item.imageUrl === ''
                                                    ? 'https://via.placeholder.com/1000x1000.png?text=No+Image'
                                                    : item.imageUrl
                                            }
                                            h={100}
                                            fit="contain"
                                            alt="Картинка товара"
                                        />
                                        <Stack gap={'xs'}>
                                            <Text>{item.name}</Text>
                                            <Spoiler
                                                maxHeight={120}
                                                showLabel="Раскрыть"
                                                hideLabel="Скрыть"
                                            >
                                                {item.description}
                                            </Spoiler>
                                            <Text>
                                                Количество товара: {item.count}
                                            </Text>
                                            <Text>
                                                Стоимость товаров: {item.price}{' '}
                                                ₽
                                            </Text>
                                        </Stack>
                                    </Group>
                                </Card>
                            ))}
                        </Stack>
                    </Collapse>
                </Stack>
            </Card>
        </>
    );
}

export default OrderCard;
