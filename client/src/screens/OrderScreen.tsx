import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { orderDetails } from '../actions/ordersActions';

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetailsFromState = useSelector(
    (state: RootState) => state.orderDetails
  );
  const { loading, error, order } = orderDetailsFromState;

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(orderDetails(orderId));
    }
  }, [order, orderId, dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order #{orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping address:</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email to: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}
                <strong> City: </strong>
                {order.shippingAddress.city}
                <strong> Postal Code: </strong>
                {order.shippingAddress.postalCode}
                <strong> Country: </strong>
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                  <Col>Items price: </Col>
                  <Col>{order.itemsPrice}$</Col>
                </Row>
                <Row>
                  <Col>Shipping price: </Col>
                  <Col>{order.shippingPrice}$</Col>
                </Row>
                <Row>
                  <Col>Tax price: </Col>
                  <Col>{order.taxPrice}$</Col>
                </Row>
                <Row>
                  <Col>Total price: </Col>
                  <Col>{order.totalPrice}$</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
