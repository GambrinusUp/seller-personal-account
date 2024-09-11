import { OrderItem } from '../utils/types';

export function countNumberProducts(products: OrderItem[]) {
    const count = products.reduce(function (acc, order) {
        return acc + order.count;
    }, 0);

    return count;
}
