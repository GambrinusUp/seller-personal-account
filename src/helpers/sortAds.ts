import { Advertisment } from '../utils/types';

export const sortAds = (
    ads: Advertisment[],
    sortMethod: string | null,
    sortDirection: 'asc' | 'desc'
): Advertisment[] => {
    if (sortMethod === 'price') {
        return [...ads].sort((a, b) =>
            sortDirection === 'asc' ? a.price - b.price : b.price - a.price
        );
    } else if (sortMethod === 'views') {
        return [...ads].sort((a, b) =>
            sortDirection === 'asc' ? a.views - b.views : b.views - a.views
        );
    } else if (sortMethod === 'likes') {
        return [...ads].sort((a, b) =>
            sortDirection === 'asc' ? a.likes - b.likes : b.likes - a.likes
        );
    }
    return ads;
};
