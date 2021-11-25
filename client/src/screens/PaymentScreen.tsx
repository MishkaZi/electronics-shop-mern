import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { RootState } from '../store';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import ShippingModel from '../models/ShippingModel';

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress }: { shippingAddress: ShippingModel } = cart;
  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4={false} />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check> */}
          </Col>

          <Button className='my-3' type='submit' variant='primary'>
            Continue
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
