import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import ProductModel from '../models/ProductModel';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

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
