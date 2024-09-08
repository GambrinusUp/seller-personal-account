import { Button, Flex, Pagination, Select, SimpleGrid } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

import AdvertisementCard from '../components/AdvertisementCard/AdvertisementCard';
import SearchInput from '../components/SearchInput/SearchInput';
import { Advertisment } from '../utils/types';

function AdvertisementsPage() {
    const [ads, setAds] = useState<Advertisment[]>([]);
    const [filteredAds, setFilteredAds] = useState<Advertisment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [adsPerPage, setAdsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState<string>('');
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
            //alert(searchQuery);
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
                    : 'Нет совпадений'}
            </SimpleGrid>
            <Flex justify="center" align="center" mt="md">
                <Pagination
                    value={currentPage}
                    onChange={handlePageChange}
                    total={Math.ceil(filteredAds.length / adsPerPage)}
                />
            </Flex>
        </>
    );
}

export default AdvertisementsPage;
