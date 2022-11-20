import React, { useState, useEffect } from 'react'
import { Link, Routes, Route, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'

import '../app.css'
import axios from 'axios'

function ProductScreen(props) {  
   let {id} = useParams()
  const [product, setProduct] = useState([]);

  useEffect(()=>{
     async function fetchProduct(){
      const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
      setProduct(data)
    }

    fetchProduct()
    
  },[] )
  
    return (
    <div>
      <Link to ='/Home' className = 'btn btn-light my-3'>Go Back</Link>
      <Row>
        <Col md={4}>
            <img className="productscreen-img" src = {`${product.image}`} alt = {product.name} fluid />
        </Col>
        <Col md={5} className="productscreen-content">
          <ListGroup variant = "flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} review`} color={'yellow'}/>
            </ListGroup.Item>

            <ListGroup.Item>
              Price: INR {product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>



          </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
              <ListGroup variant = "flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>INR {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button className='btn-block button-fill' disabled={product.countInStock===0} type='button'>Add to Cart</Button>
                </ListGroup.Item>
              </ListGroup>

            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
