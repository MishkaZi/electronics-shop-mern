import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductModel from '../models/ProductModel';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState<ProductModel | any>({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${match.params.id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [match.params.id]);

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid></Image>
          <ListGroup.Item>{product.description}</ListGroup.Item>
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: {product.price}$</ListGroup.Item>
          </ListGroup>
        </Col>
        {/* Cart Add  */}
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                </Row>
                <Col>
                  <strong>{product.price}$</strong>
                </Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                </Row>
                <Col>
                  <strong>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </strong>
                </Col>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  disabled={match.countInStock === 0}
                  className='btn-clock'
                  type='button'
                >
                  Add To
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
