import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productsActions';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import ProductModel from '../models/ProductModel';
import { RootState } from '../store';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const productList = useSelector((state: RootState) => state.productList);
  const { loading, error, products } = productList;

  return (
    <>
      <Meta />
      {/* {!keyword ? <ProductCarousel/>:<Link to='/' className='btn btn-light'>Go Back<Link/>} */}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product: ProductModel) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product {...product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
