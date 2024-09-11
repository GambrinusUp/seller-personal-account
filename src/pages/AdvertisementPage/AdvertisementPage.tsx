import {
    Badge,
    Button,
    Card,
    Flex,
    Group,
    Image,
    Loader,
    NumberInput,
    SimpleGrid,
    Spoiler,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { isInRange, isNotEmpty, useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { MdOutlineRemoveRedEye, MdThumbUpOffAlt } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { formatDateTime } from '../../helpers/formatDateTime';
import { useAdvertisement } from '../../hooks/useAdvertisement';

function AdvertisementPage() {
    const { id } = useParams();
    const { adDetails, updateAdvertisement, removeAdvertisement, loading } =
        useAdvertisement(id!);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: adDetails?.name || '',
            price: adDetails?.price || 0,
            description: adDetails?.description || '',
            imageUrl: adDetails?.imageUrl || '',
        },
        validate: {
            name: isNotEmpty('Название не может быть пустым'),
            price: isInRange({ min: 1 }, 'Стоимость должна быть больше 0'),
        },
    });

    useEffect(() => {
        if (adDetails) {
            form.setValues({
                name: adDetails.name,
                price: adDetails.price,
                description: adDetails.description,
                imageUrl: adDetails.imageUrl,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adDetails]);

    const handleSubmit = (values: typeof form.values) => {
        updateAdvertisement(values);
        setIsEditing(false);
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
                direction="column"
                wrap="wrap"
            >
                <Card shadow="sm" radius="md" withBorder maw={1200} w="100%">
                    <SimpleGrid
                        cols={{ base: 1, md: 2 }}
                        spacing="xl"
                        verticalSpacing="md"
                    >
                        <Card.Section p="md">
                            {isEditing ? (
                                <TextInput
                                    label="URL изображения"
                                    {...form.getInputProps('imageUrl')}
                                />
                            ) : (
                                <Image
                                    src={
                                        adDetails?.imageUrl === ''
                                            ? 'https://via.placeholder.com/1000x1000.png?text=No+Image'
                                            : adDetails?.imageUrl
                                    }
                                    h={500}
                                    fit="contain"
                                    alt="Картинка товара"
                                />
                            )}
                        </Card.Section>
                        <Card.Section p="md">
                            <Group justify="flex-end">
                                <Text size="sm" c="dimmed">
                                    Создан:{' '}
                                    {adDetails &&
                                        formatDateTime(adDetails?.createdAt)}
                                </Text>
                            </Group>
                            {isEditing ? (
                                <TextInput
                                    label="Название"
                                    {...form.getInputProps('name')}
                                />
                            ) : (
                                <Text fw={500}>{adDetails?.name}</Text>
                            )}
                            <Group>
                                {isEditing ? (
                                    <NumberInput
                                        label="Цена"
                                        {...form.getInputProps('price')}
                                        min={0}
                                    />
                                ) : (
                                    <>
                                        Цена:
                                        <Badge color="pink" size="xl">
                                            {adDetails?.price} ₽
                                        </Badge>
                                    </>
                                )}
                            </Group>
                            {isEditing ? (
                                <Textarea
                                    label="Описание"
                                    minRows={4}
                                    resize="vertical"
                                    {...form.getInputProps('description')}
                                />
                            ) : (
                                <Spoiler
                                    maxHeight={120}
                                    showLabel="Раскрыть"
                                    hideLabel="Скрыть"
                                    transitionDuration={1000}
                                >
                                    {adDetails?.description}
                                </Spoiler>
                            )}
                            <Group justify="center" grow>
                                <Group justify="center">
                                    <MdOutlineRemoveRedEye />{' '}
                                    {adDetails?.views.toString()}
                                </Group>
                                <Group justify="center">
                                    <MdThumbUpOffAlt />{' '}
                                    {adDetails?.likes.toString()}
                                </Group>
                            </Group>
                            {isEditing ? (
                                <>
                                    <Button
                                        color="blue"
                                        fullWidth
                                        mt="md"
                                        radius="md"
                                        mb="md"
                                        onClick={() =>
                                            form.onSubmit(handleSubmit)()
                                        }
                                    >
                                        Сохранить
                                    </Button>
                                    <Button
                                        color="gray"
                                        fullWidth
                                        radius="md"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Отмена
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        color="blue"
                                        fullWidth
                                        mt="md"
                                        radius="md"
                                        mb="md"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        color="red"
                                        fullWidth
                                        mt="md"
                                        radius="md"
                                        mb="md"
                                        onClick={() => {
                                            removeAdvertisement();
                                            navigate('/');
                                        }}
                                    >
                                        Удалить
                                    </Button>
                                </>
                            )}
                        </Card.Section>
                    </SimpleGrid>
                </Card>
            </Flex>
        </>
    );
}

export default AdvertisementPage;
