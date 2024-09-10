import {
    Badge,
    Button,
    Card,
    Flex,
    Group,
    Image,
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
import { useParams } from 'react-router-dom';

import { formatDateTime } from '../../helpers/formatDateTime';
import { useNotification } from '../../hooks/useNotification';
import { Advertisment } from '../../utils/types';

function AdvertisementPage() {
    const { id } = useParams();
    const [adDetails, setAdDetails] = useState<Advertisment | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { showSuccess, showError } = useNotification();

    const form = useForm({
        initialValues: {
            name: adDetails?.name || '',
            price: adDetails?.price || 0,
            description: adDetails?.description || '',
            imageUrl: adDetails?.imageUrl || '',
        },
        validate: {
            imageUrl: isNotEmpty('URL картинки не может быть пустым'),
            name: isNotEmpty('Название не может быть пустым'),
            description: isNotEmpty('Описание не может быть пустым'),
            price: isInRange({ min: 1 }, 'Стоимость должна быть больше 0'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
        setAdDetails((prevDetails) => {
            if (!prevDetails) return prevDetails;
            return {
                ...prevDetails,
                ...values,
            };
        });

        const editAdvertisement = {
            name: values.name,
            description: values.description,
            price: values.price,
            imageUrl: values.imageUrl,
        };

        setIsEditing(false);

        fetch('http://localhost:8000/advertisements/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editAdvertisement),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка сети при редактировании записи');
                }
                return response.json();
            })
            .then((data: Advertisment) => {
                showSuccess('Объявление отредактировано');
                console.log(data);
                setAdDetails(data);
                form.setValues({
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    imageUrl: data.imageUrl,
                });
            })
            .catch((error) => {
                showError('Ошибка при редактировании записи');
                console.error(error.message);
            });
    };

    useEffect(() => {
        console.log(id);
        fetch('http://localhost:8000/advertisements/' + id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAdDetails(data);
                form.setValues({
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    imageUrl: data.imageUrl,
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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
                                        onClick={() => alert('удалить')}
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
