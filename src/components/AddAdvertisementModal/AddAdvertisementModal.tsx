import {
    Button,
    Group,
    Modal,
    NumberInput,
    Textarea,
    TextInput,
} from '@mantine/core';
import { isInRange, isNotEmpty, useForm } from '@mantine/form';

interface ModalProps {
    opened: boolean;
    close: () => void;
    onSubmitAdd: (newAd: {
        imageUrl: string;
        name: string;
        description: string;
        price: number;
    }) => void;
}

function AddAdvertisementModal({ opened, close, onSubmitAdd }: ModalProps) {
    const form = useForm({
        initialValues: {
            imageUrl: '',
            name: '',
            description: '',
            price: 0,
        },
        validate: {
            imageUrl: isNotEmpty('URL картинки не может быть пустым'),
            name: isNotEmpty('Название не может быть пустым'),
            description: isNotEmpty('Описание не может быть пустым'),
            price: isInRange({ min: 1 }, 'Стоимость должна быть больше 0'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        onSubmitAdd(values);
        close();
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Создание нового объявления"
            centered
        >
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    label="URL картинки"
                    placeholder="Введите URL изображения"
                    {...form.getInputProps('imageUrl')}
                    mb="sm"
                />
                <TextInput
                    label="Название"
                    placeholder="Введите название объявления"
                    {...form.getInputProps('name')}
                    mb="sm"
                />
                <Textarea
                    label="Описание"
                    placeholder="Введите описание"
                    {...form.getInputProps('description')}
                    mb="sm"
                    resize="vertical"
                />
                <NumberInput
                    label="Стоимость"
                    placeholder="Введите стоимость"
                    {...form.getInputProps('price')}
                    mb="sm"
                />
                <Group mt="md">
                    <Button type="submit">Создать</Button>
                </Group>
            </form>
        </Modal>
    );
}

export default AddAdvertisementModal;
