import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { RootState } from '../store';
import ShippingModel from '../models/ShippingModel';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress }: { shippingAddress: ShippingModel } = cart;

  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ''
  );
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ''
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ''
  );
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : ''
  );

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3={false} step4={false} />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label className='pt-3'>Address:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address...'
            value={address}
            autoComplete='on'
            required
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label className='pt-3'>City:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city...'
            value={city}
            autoComplete='on'
            required
            onChange={(e) => {
              setCity(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label className='pt-3'>Postal Code:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code...'
            value={postalCode}
            autoComplete='on'
            required
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label className='pt-3'>Country:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country...'
            value={country}
            autoComplete='on'
            required
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button className='my-3' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
