import CartItemModel from "./CartItemModel";
import ShippingModel from "./ShippingModel";
import UserInfoModel from "./UserInfoModel";

export default interface OrderModel {
    _id?: string;
    orderItems?: CartItemModel[];
    user?: UserInfoModel;
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