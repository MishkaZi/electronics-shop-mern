import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { RootState } from '../store';
import UserInfoModel from '../models/UserInfoModel';
import { getDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state: RootState) => state.userDetails);
  const { loading, error, userInfo } = userDetails;
  const user: UserInfoModel = userInfo;

  const userUpdate = useSelector((state: RootState) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, userId, successUpdate, history]);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: user._id,
        name,
        email,
        isAdmin,
      })
    );
  };
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light'>
        Go back
      </Link>
      <FormContainer>
        <h1>User Edit</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label className='pt-3'>Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name...'
                value={name}
                autoComplete='on'
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
                autoComplete='on'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='esAdmin' className='pt-3'>
              <Form.Check
                type='checkbox'
                label='Is Admin:'
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>

            <Button className='mt-3' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
