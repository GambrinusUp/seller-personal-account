import { Button, Modal, Radio, RadioGroup, Stack } from '@mantine/core';
import { useState } from 'react';

import OrderStatusLabels from '../../utils/orderStatus';

interface ModalProps {
    id: string;
    currentStatus: number;
    opened: boolean;
    close: () => void;
    onSave: (id: string, newStatus: number) => void;
}

function OrderStatusModal({
    id,
    currentStatus,
    opened,
    close,
    onSave,
}: ModalProps) {
    const [selectedStatus, setSelectedStatus] = useState<number>(currentStatus);

    const handleSave = () => {
        console.log(id, selectedStatus);
        onSave(id, selectedStatus);
        close();
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Изменение статуса заказа"
            centered
        >
            <RadioGroup
                value={selectedStatus.toString()}
                onChange={(value) => setSelectedStatus(Number(value))}
            >
                <Stack gap={'md'}>
                    {Object.entries(OrderStatusLabels).map(
                        ([status, label]) => (
                            <Radio key={status} value={status} label={label} />
                        )
                    )}
                </Stack>
            </RadioGroup>
            <Button onClick={handleSave} fullWidth mt="md">
                Сохранить
            </Button>
        </Modal>
    );
}

export default OrderStatusModal;
