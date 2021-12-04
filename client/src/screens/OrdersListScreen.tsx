import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getDetails, updateProfile } from '../actions/userActions';
import { RootState } from '../store';
import UserInfoModel from '../models/UserInfoModel';
import { USER_UPDATE_PROFILE__RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/ordersActions';
import OrderModel from '../models/OrderModel';
import { LinkContainer } from 'react-router-bootstrap';

const OrdersListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootState) => state.userLogin);

  const orderMyList = useSelector((state: RootState) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userLogin.userInfo) {
      history.push('/login');
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, history, userLogin.userInfo]);

  const submitHandler = (e: SyntheticEvent) => {};

  return (
    <Row>
      <Col md={9}>
        <h2>My orders: </h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>button</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: OrderModel) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPayed ? (
                      order.payedAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='dark'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default OrdersListScreen;
