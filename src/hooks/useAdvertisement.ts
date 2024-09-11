import { useEffect, useState } from 'react';

import {
    deleteAdvertisement,
    editAdvertisement,
    fetchAdvertisement,
} from '../api/advertisementsAPI';
import { Advertisment } from '../utils/types';
import { useNotification } from './useNotification';

export function useAdvertisement(id: string) {
    const [adDetails, setAdDetails] = useState<Advertisment | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showSuccess, showError } = useNotification();

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        fetchAdvertisement(id)
            .then((data) => setAdDetails(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [id]);

    const updateAdvertisement = (updatedData: Partial<Advertisment>) => {
        setLoading(true);
        editAdvertisement(id, updatedData)
            .then((updatedAd) => {
                setAdDetails(updatedAd);
                showSuccess('Объявление обновлено успешно');
            })
            .catch((error) => {
                setError(error.message);
                showError('Ошибка при обновлении объявления');
            })
            .finally(() => setLoading(false));
    };

    const removeAdvertisement = () => {
        setLoading(true);
        deleteAdvertisement(id)
            .then(() => {
                setAdDetails(null);
                showSuccess('Объявление удалено успешно');
            })
            .catch((error) => {
                setError(error.message);
                showError('Ошибка при удалении объявления');
            })
            .finally(() => setLoading(false));
    };

    return {
        adDetails,
        updateAdvertisement,
        removeAdvertisement,
        loading,
        error,
    };
}
