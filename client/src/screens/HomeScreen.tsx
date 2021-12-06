import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productsActions';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import ProductModel from '../models/ProductModel';
import { RootState } from '../store';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state: RootState) => state.productList);
  const { loading, error, products, pages, page } = productList;

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
        <>
          <Row>
            {products.map((product: ProductModel) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product {...product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
