import {
    Button,
    Flex,
    Loader,
    Pagination,
    Select,
    SimpleGrid,
} from '@mantine/core';
import { useDisclosure, useScrollIntoView } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

import AddAdvertisementModal from '../../components/AddAdvertisementModal/AddAdvertisementModal';
import AdsFilter from '../../components/AdsFilter/AdsFilter';
import AdvertisementCard from '../../components/AdvertisementCard/AdvertisementCard';
import SearchInput from '../../components/SearchInput/SearchInput';
import { sortAds } from '../../helpers/sortAds';
import { useAdvertisements } from '../../hooks/useAdvertisements';
import { useNotification } from '../../hooks/useNotification';

function AdvertisementsPage() {
    const { ads, addAdvertisement, error, loading } = useAdvertisements();
    const [filteredAds, setFilteredAds] = useState(ads);
    const [currentPage, setCurrentPage] = useState(1);
    const [adsPerPage, setAdsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [opened, { open, close }] = useDisclosure(false);
    const { showSuccess, showError } = useNotification();
    const { scrollIntoView } = useScrollIntoView();
    const [sortMethod, setSortMethod] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error, showError]);

    useEffect(() => {
        setFilteredAds(ads);
    }, [ads]);

    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;

    const currentAds = sortAds(filteredAds, sortMethod, sortDirection).slice(
        indexOfFirstAd,
        indexOfLastAd
    );

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
            const filteredBySearch = ads.filter((ad) =>
                ad.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
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
        const newAdvertisement = {
            name: newAd.name,
            description: newAd.description,
            price: newAd.price,
            createdAt: new Date().toISOString(),
            views: 0,
            likes: 0,
            imageUrl: newAd.imageUrl,
        };

        addAdvertisement(newAdvertisement);
        showSuccess('Новая запись добавлена');
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
                mt="md"
                mb="md"
                direction="column"
            >
                <SearchInput
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={searchAds}
                    resetAds={() => setFilteredAds(ads)}
                />
                <AdsFilter
                    sortMethod={sortMethod}
                    setSortMethod={setSortMethod}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                />
                <Select
                    label="Объявлений на странице"
                    placeholder="Выберите количество"
                    data={['10', '25', '50']}
                    value={adsPerPage.toString()}
                    onChange={handleAdsPerPageChange}
                    radius="md"
                    mb="sm"
                    allowDeselect={false}
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
