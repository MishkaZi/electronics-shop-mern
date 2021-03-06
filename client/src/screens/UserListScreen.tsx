import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { allUsers, deleteUser } from '../actions/userActions';
import { RootState } from '../store';
import { LinkContainer } from 'react-router-bootstrap';
import UserInfoModel from '../models/UserInfoModel';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state: RootState) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state: RootState) => state.userDelete);
  const {
    success: userDeleteSuccess,
    error: userDeleteError,
    message,
  } = userDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(allUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, userDeleteSuccess]);

  const deleteHandler = (userId: string) => {
    if (window.confirm('Are you sure ?')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {userDeleteError ? (
        <Message variant='danger'>{userDeleteError}</Message>
      ) : message ? (
        <Message variant='success'>{message}</Message>
      ) : (
        <></>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>button</th>
            </tr>
          </thead>
          <tbody>
            {(users as UserInfoModel[]).map((user: UserInfoModel) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className='btn-sm' variant='dark'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    disabled={userInfo._id === user._id}
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
