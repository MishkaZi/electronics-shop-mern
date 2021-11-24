import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getDetails, updateProfile } from '../actions/userActions';
import { RootState } from '../store';
import UserInfoModel from '../models/UserInfoModel';
import { USER_UPDATE_PROFILE__RESET } from '../constants/userConstants';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const details = useSelector((state: RootState) => state.userDetails);
  const { loading, error, userInfo } = details;
  const user: UserInfoModel = userInfo;

  const userLogin = useSelector((state: RootState) => state.userLogin);

  const userUpdate = useSelector((state: RootState) => state.userUpdate);
  const { success } = userUpdate;

  useEffect(() => {
    if (!userLogin.userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE__RESET });
        dispatch(getDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userLogin.userInfo, user, dispatch, success]);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      dispatch(updateProfile({ _id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        {' '}
        <h1>User Profile</h1>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='success'>Your profile was updated! </Message>
        )}
        {message && <Message variant='danger'>{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label className='pt-3'>Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name...'
              value={name}
              autoComplete='off'
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label className='pt-3'>Email Address:</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email...'
              value={email}
              autoComplete='off'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label className='pt-3'>Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password...'
              value={password}
              autoComplete='off'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirm-password'>
            <Form.Label className='pt-3'>Confirm Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password...'
              value={confirmPassword}
              autoComplete='off'
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Button className='mt-3' type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders: </h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
