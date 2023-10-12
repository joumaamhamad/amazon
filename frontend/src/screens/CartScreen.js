import React, { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// img-fluid: This class makes the image responsive,
// rounded: The "rounded" class adds rounded corners to the image, giving it a softer and more visually appealing look. You can also use "rounded-circle" to create a circular image.
// img-thumbnail: The "img-thumbnail" class adds a border and a slight shadow to the image, making it appear as a thumbnail
// variant flush => A flush list group removes the default borders and rounded corners
//variant="primary" indicates that the button should have the primary color scheme defined by your styling

function CartScreen(){
    
    const navigate = useNavigate();
    const { state , dispatch: ctxDispatch } = useContext(Store);
    const { cart: {cartItems} } = state; // destructuring for cartItems

    const updateCartHandler = async (item , quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);

        if(data.countInStock < quantity){
            window.alert('Sory , The product is out of stock');
            return;
        }

        ctxDispatch({type: 'CART_ADD_ITEM' , payload: {...item , quantity: quantity}});
        

    }

    const removeItemHandler = (item) => {

        ctxDispatch({type: 'CART-REMOVE-ITEM' , payload: item});
    }

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }

    return(
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>

            <Row>
                <Col md={8}>
                    {
                        cartItems.length === 0 ? (
                            <MessageBox>Cart is empty! <Link to="/">Go Shopping</Link></MessageBox>
                        )
                        : (
                            <ListGroup>
                                {
                                    cartItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className='align-items-center'>
                                                <Col md={4}>
                                                    <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"></img>{' '}
                                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={3}>
                                                    <Button onClick={() => updateCartHandler(item , item.quantity-1)}  variant="light" disabled={item.quantity === 1}>
                                                        <i className="fas fa-minus-circle"></i>
                                                    </Button>

                                                    <span>{item.quantity}</span>

                                                    <Button onClick={() => updateCartHandler(item , item.quantity+1)} variant="light" disabled={item.quantity === item.countInStock}>
                                                        <i className="fas fa-plus-circle"></i>
                                                    </Button>
                                                </Col>

                                                <Col md={3}>{item.price}$</Col>

                                                <Col md={2}>
                                                    <Button onClick={() => removeItemHandler(item)} variant="light">
                                                        <i className="fas fa-trash"></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        )
                    }

                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal {cartItems.reduce((a , c) => a + c.quantity  , 0)} items : 
                                        {cartItems.reduce((a , c) => a + c.price * c.quantity , 0)}$
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button onClick={checkoutHandler} type="button" variant="primary" disabled={cartItems.length === 0}>
                                            Proceed to checkOut
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen;