import CartItemModel from "./CartItemModel";
import ShippingModel from "./ShippingModel";

export default interface OrderModel {
    orderItems?: CartItemModel[];
    user?: String;
    shippingAddress?: ShippingModel;
    paymentMethod?: String;
    itemsPrice?: Number;
    taxPrice?: Number;
    shippingPrice?: Number;
    totalPrice?: Number;

}