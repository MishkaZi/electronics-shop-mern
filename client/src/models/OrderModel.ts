import CartItemModel from "./CartItemModel";
import ShippingModel from "./ShippingModel";

export default interface OrderModel {
    _id?: string;
    orderItems?: CartItemModel[];
    user?: String;
    shippingAddress?: ShippingModel;
    paymentMethod?: String;
    itemsPrice?: Number;
    taxPrice?: Number;
    shippingPrice?: Number;
    totalPrice?: Number;
    createdAt?: String;
    isPayed?: boolean;
    payedAt?: string;
    isDelivered?: boolean;
    deliveredAt?: string;
}