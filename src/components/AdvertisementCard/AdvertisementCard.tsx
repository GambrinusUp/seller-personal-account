import { Badge, Button, Card, Center, Group, Image, Text } from '@mantine/core';
import { MdOutlineRemoveRedEye, MdThumbUpOffAlt } from 'react-icons/md';

import { Advertisment } from '../../utils/types';

function AdvertisementCard({ advertisement }: { advertisement: Advertisment }) {
    const { name, price, views, likes, imageUrl } = advertisement;

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ maxWidth: 1000, width: '100%' }}
        >
            <Card.Section>
                <Center>
                    <Image
                        src={
                            imageUrl === ''
                                ? 'https://via.placeholder.com/1000x1000.png?text=No+Image'
                                : imageUrl
                        }
                        h={400}
                        w="auto"
                        fit="contain"
                        alt="Картинка товара"
                    />
                </Center>
            </Card.Section>
            <Group justify="space-between" mt="md" mb="md">
                <Text fw={500}>{name}</Text>
                <Badge color="pink" size="xl">
                    {price} ₽
                </Badge>
            </Group>
            <Button color="blue" fullWidth mt="md" radius="md" mb="md">
                Заказы
            </Button>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="center" grow>
                    <Group justify="center">
                        <MdOutlineRemoveRedEye /> {views}
                    </Group>
                    <Group justify="center">
                        <MdThumbUpOffAlt /> {likes}
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    );
}

export default AdvertisementCard;
