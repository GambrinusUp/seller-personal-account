import { useEffect, useState } from 'react';

import {
    createAdvertisement,
    fetchAdvertisements,
} from '../api/advertisementsAPI';
import { Advertisment } from '../utils/types';

export function useAdvertisements() {
    const [ads, setAds] = useState<Advertisment[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchAdvertisements()
            .then((data) => setAds(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    const addAdvertisement = (newAd: Omit<Advertisment, 'id'>) => {
        setLoading(true);
        createAdvertisement(newAd)
            .then((data) => setAds((prevAds) => [...prevAds, data]))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    };

    return { ads, addAdvertisement, error, loading };
}
