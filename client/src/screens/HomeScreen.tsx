import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import ProductModel from '../models/ProductModel';
import products from '../products';
const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product: ProductModel) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
