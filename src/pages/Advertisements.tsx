import { Flex, Pagination, Select, SimpleGrid } from '@mantine/core';
import { useEffect, useState } from 'react';

import AdvertisementCard from '../components/AdvertisementCard/AdvertisementCard';
import { Advertisment } from '../utils/types';

function AdvertisementsPage() {
    const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [adsPerPage, setAdsPerPage] = useState(10);

    useEffect(() => {
        fetch('http://localhost:8000/advertisements')
            .then((response) => response.json())
            .then((data) => setAdvertisements(data));
    }, []);

    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = advertisements.slice(indexOfFirstAd, indexOfLastAd);

    const handlePageChange = (page: number | null) => {
        if (page) {
            setCurrentPage(page);
        }
    };

    const handleAdsPerPageChange = (value: string | null) => {
        if (value) {
            setAdsPerPage(Number(value));
            setCurrentPage(1);
        }
    };

    return (
        <>
            <Flex justify="center" align="center" mt="md" mb="md">
                <Select
                    label="Объявлений на странице"
                    placeholder="Выберите количество"
                    data={['10', '25', '50']}
                    value={adsPerPage.toString()}
                    onChange={handleAdsPerPageChange}
                />
            </Flex>
            <Flex
                gap="xl"
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
            >
                <SimpleGrid
                    cols={{ base: 1, xs: 2, sm: 3, xl: 5 }}
                    spacing="md"
                    verticalSpacing="md"
                >
                    {currentAds.length > 0 &&
                        currentAds.map((ad) => (
                            <AdvertisementCard key={ad.id} advertisement={ad} />
                        ))}
                </SimpleGrid>
            </Flex>
            <Flex justify="center" align="center" mt="md">
                <Pagination
                    value={currentPage}
                    onChange={handlePageChange}
                    total={Math.ceil(advertisements.length / adsPerPage)}
                />
            </Flex>
        </>
    );
}

export default AdvertisementsPage;
