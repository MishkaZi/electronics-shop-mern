import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { RootState } from '../store';
import { listProductDetails, updateProduct } from '../actions/productsActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const productDetails = useSelector(
    (state: RootState) => state.productDetails
  );
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state: RootState) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setDescription(product.description);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
      }
    }
  }, [
    dispatch,
    history,
    product._id,
    product.brand,
    product.category,
    product.countInStock,
    product.description,
    product.image,
    product.name,
    product.price,
    productId,
    successUpdate,
  ]);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        description,
        category,
        countInStock,
        image,
      })
    );
  };
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light'>
        Go back
      </Link>
      <FormContainer>
        <h1>Product Edit</h1>
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label className='pt-3'>Price:</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price...'
                value={price}
                onChange={(e) => {
                  setPrice(+e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label className='pt-3'>Image:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url...'
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label className='pt-3'>Brand:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand...'
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label className='pt-3'>Category:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category...'
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label className='pt-3'>Description:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description...'
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label className='pt-3'>In stock:</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock...'
                value={countInStock}
                onChange={(e) => {
                  setCountInStock(+e.target.value);
                }}
              ></Form.Control>
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

export default ProductEditScreen;
