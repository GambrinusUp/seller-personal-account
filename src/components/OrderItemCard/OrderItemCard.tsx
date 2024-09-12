import { Card, Group, Image, Spoiler, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { OrderItem } from '../../utils/types';

interface OrderItemCardProps {
    item: OrderItem;
}

function OrderItemCard({ item }: OrderItemCardProps) {
    const navigate = useNavigate();
    return (
        <Card
            p="md"
            w={'100%'}
            radius={'md'}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/advertisement/' + item.id)}
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
                    <Text>Количество товара: {item.count}</Text>
                    <Text>Стоимость товаров: {item.price} ₽</Text>
                </Stack>
            </Group>
        </Card>
    );
}

export default OrderItemCard;
