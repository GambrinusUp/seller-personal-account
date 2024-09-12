import { Group, Select } from '@mantine/core';
interface AdvertisementsFilterProps {
    sortMethod: string | null;
    setSortMethod: (value: string | null) => void;
    sortDirection: 'asc' | 'desc';
    setSortDirection: (value: 'asc' | 'desc') => void;
}
function AdsFilter({
    sortMethod,
    setSortMethod,
    sortDirection,
    setSortDirection,
}: AdvertisementsFilterProps) {
    return (
        <Group justify="center">
            <Select
                label="Сортировка"
                placeholder="Выберите метод сортировки"
                data={[
                    { value: 'price', label: 'По цене' },
                    { value: 'views', label: 'По просмотрам' },
                    { value: 'likes', label: 'По лайкам' },
                ]}
                value={sortMethod}
                onChange={setSortMethod}
                radius="md"
                mb="sm"
            />
            {sortMethod && (
                <Select
                    label="Направление сортировки"
                    placeholder="Выберите направление"
                    data={[
                        { value: 'asc', label: 'По возрастанию' },
                        { value: 'desc', label: 'По убыванию' },
                    ]}
                    value={sortDirection}
                    onChange={(value) =>
                        setSortDirection(value as 'asc' | 'desc')
                    }
                    radius="md"
                    mb="sm"
                    allowDeselect={false}
                />
            )}
        </Group>
    );
}

export default AdsFilter;
