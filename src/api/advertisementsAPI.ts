import { Advertisment } from '../utils/types';

const API_URL = 'http://localhost:8000/advertisements';

export const fetchAdvertisements = async (): Promise<Advertisment[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке объявлений');
    }
    return response.json();
};

export const fetchAdvertisement = async (id: string): Promise<Advertisment> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке объявлений');
    }
    return response.json();
};

export const createAdvertisement = async (
    newAd: Omit<Advertisment, 'id'>
): Promise<Advertisment> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAd),
    });
    if (!response.ok) {
        throw new Error('Ошибка при добавлении объявления');
    }
    return response.json();
};

export const editAdvertisement = async (
    id: string,
    advertisement: Partial<Advertisment>
): Promise<Advertisment> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(advertisement),
    });
    if (!response.ok) {
        throw new Error('Ошибка при редактировании объявления');
    }
    return response.json();
};

export const deleteAdvertisement = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Ошибка при удалении объявления');
    }
};
