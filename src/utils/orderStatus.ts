import { OrderStatus } from './types';

const OrderStatusLabels = {
    [OrderStatus.Created]: 'Создан',
    [OrderStatus.Paid]: 'Оплачен',
    [OrderStatus.Transport]: 'В пути',
    [OrderStatus.DeliveredToThePoint]: 'Доставлен в пункт выдачи',
    [OrderStatus.Received]: 'Доставлен',
    [OrderStatus.Archived]: 'Архивирован',
    [OrderStatus.Refund]: 'Возвращён',
};

export default OrderStatusLabels;
