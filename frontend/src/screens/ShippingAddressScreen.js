import React, { useContext, useEffect, useState  } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
//my-3 : margin top and bottom


export default function ShippingAddressScreen() {

    const navigate = useNavigate();
    const { state , dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart: {shippingAddress}
    } = state;

    const [fullName , setFullName] = useState(shippingAddress.fullName || '');
    const [address , setAddress] = useState(shippingAddress.address || '');
    const [city , setCity] = useState(shippingAddress.city || '');
    const [postalCode , setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country , setCountry] = useState(shippingAddress.country || '');

    //if i am in the shipping page , so i do signout => redirect to the signin page
    useEffect(() => {
        if(!userInfo){
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo , navigate]);


    const submitHandler = (e) => {

        e.preventDefault();
        
        const data =  {
          fullName: fullName,
          address: address,
          city: city,
          postalCode: postalCode,
          country: country,
      }

      console.log("data: " , data);

        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: data
        });

        localStorage.setItem('shippingAddress' , JSON.stringify({
            fullName:  fullName,
            address: address,
            city: city,
            postalCode: postalCode,
            country: country,
        }));

        //console.log(shippingAddress);

        navigate('/payment');
        
    }

return (
    <div>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
        <CheckoutSteps step1 step2 />

        <div className='container small-container'>
        <h1 className='my-3'>Shipping Address</h1>
        <Form onSubmit={submitHandler}>

            <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </Form.Group>

            <div className="mb-3">
                <Button variant="primary" type="submit">
                    Continue
                </Button>
            </div>

        </Form>

        </div>


    </div>
)
}
