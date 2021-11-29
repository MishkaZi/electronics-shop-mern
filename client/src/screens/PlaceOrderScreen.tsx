import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import ShippingModel from '../models/ShippingModel';
import CheckoutSteps from '../components/CheckoutSteps';
import CartItemModel from '../models/CartItemModel';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import OrderModel from '../models/OrderModel';
import { createOrder } from '../actions/ordersActions';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const {
    shippingAddress,
    paymentMethod,
    cartItems,
  }: {
    shippingAddress: ShippingModel;
    paymentMethod: String;
    cartItems: CartItemModel[];
  } = cart;

  //Calculate prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 150 ? 0 : 100;

  const taxPrice = +(0.18 * itemsPrice).toFixed(2);

  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const orderCreate = useSelector((state: RootState) => state.createOrder);
  const { success, error, order } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${(order as OrderModel)._id}`);
    }
  }, [history, success, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}
                <strong>City: </strong>
                {shippingAddress.city}
                <strong>Postal Code: </strong>
                {shippingAddress.postalCode}
                <strong>Country: </strong>
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price}$ ={' '}
                          {(item.qty * item.price).toFixed(2)}$
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
                <Row>
                  <Col>Items: </Col>
                  <Col>{itemsPrice}$</Col>
                </Row>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>{shippingPrice}$</Col>
                </Row>
                <Row>
                  <Col>Tax: </Col>
                  <Col>{taxPrice}$</Col>
                </Row>
                <Row>
                  <Col>Total: </Col>
                  <Col>{totalPrice}$</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
