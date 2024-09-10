import { Button, Flex, Pagination, Select, SimpleGrid } from '@mantine/core';
import { useDisclosure, useScrollIntoView } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

import AddAdvertisementModal from '../../components/AddAdvertisementModal/AddAdvertisementModal';
import AdvertisementCard from '../../components/AdvertisementCard/AdvertisementCard';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useNotification } from '../../hooks/useNotification';
import { Advertisment } from '../../utils/types';

function AdvertisementsPage() {
    const [ads, setAds] = useState<Advertisment[]>([]);
    const [filteredAds, setFilteredAds] = useState<Advertisment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [adsPerPage, setAdsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [opened, { open, close }] = useDisclosure(false);
    const { showSuccess, showError } = useNotification();
    const { scrollIntoView } = useScrollIntoView();

    useEffect(() => {
        fetch('http://localhost:8000/advertisements')
            .then((response) => response.json())
            .then((data) => {
                setAds(data);
                setFilteredAds(data);
            });
    }, []);

    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

    const handlePageChange = (page: number | null) => {
        if (page) {
            setCurrentPage(page);
            scrollIntoView({ alignment: 'start' });
        }
    };

    const handleAdsPerPageChange = (value: string | null) => {
        if (value) {
            setAdsPerPage(Number(value));
            setCurrentPage(1);
        }
    };

    const searchAds = () => {
        if (searchQuery.trim().length > 0) {
            setCurrentPage(1);
            const filteredBySearch = ads.filter((ad) => {
                return ad.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            });
            setFilteredAds(filteredBySearch);
        } else {
            setFilteredAds(ads);
        }
    };

    const handleCreateAd = (newAd: {
        imageUrl: string;
        name: string;
        description: string;
        price: number;
    }) => {
        console.log('Новое объявление:', newAd);
        const newAdvertisement = {
            name: newAd.name,
            description: newAd.description,
            price: newAd.price,
            createdAt: new Date().toISOString(),
            views: 0,
            likes: 0,
            imageUrl: newAd.imageUrl,
        };

        fetch('http://localhost:8000/advertisements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAdvertisement),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка сети при добавлении записи');
                }
                return response.json();
            })
            .then((data: Advertisment) => {
                showSuccess('Новая запись добавлена');
                console.log('Новая запись добавлена:', data);
                setAds((prevAds) => [...prevAds, data]);
                setFilteredAds((prevAds) => [...prevAds, data]);
                setCurrentPage(1);
                setSearchQuery('');
            })
            .catch((error) => {
                showError(error.message);
                console.error('Ошибка при добавлении записи:', error.message);
            });
    };

    return (
        <>
            <Flex
                justify="center"
                align="center"
                mt="md"
                mb="md"
                direction="column"
            >
                <SearchInput
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={searchAds}
                />
                <Select
                    label="Объявлений на странице"
                    placeholder="Выберите количество"
                    data={['10', '25', '50']}
                    value={adsPerPage.toString()}
                    onChange={handleAdsPerPageChange}
                    radius="md"
                    mb="sm"
                />
                <Button
                    leftSection={<MdAddCircleOutline />}
                    variant="default"
                    size="md"
                    onClick={open}
                >
                    Добавить новое объявление
                </Button>
            </Flex>
            <SimpleGrid
                cols={{ base: 1, xs: 2, sm: 3, xl: 5 }}
                spacing="md"
                verticalSpacing="md"
            >
                {currentAds.length > 0
                    ? currentAds.map((ad) => (
                          <AdvertisementCard key={ad.id} advertisement={ad} />
                      ))
                    : 'Нет записей'}
            </SimpleGrid>
            <Flex justify="center" align="center" mt="md">
                <Pagination
                    value={currentPage}
                    onChange={handlePageChange}
                    total={Math.ceil(filteredAds.length / adsPerPage)}
                />
            </Flex>
            <AddAdvertisementModal
                opened={opened}
                close={close}
                onSubmitAdd={handleCreateAd}
            />
        </>
    );
}

export default AdvertisementsPage;
