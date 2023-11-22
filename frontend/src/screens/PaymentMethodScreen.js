import React, { useContext, useEffect, useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {Helmet} from 'react-helmet-async'
import { Button, Form } from 'react-bootstrap'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom';

export default function PaymentMethodScreen() {
    console.log(localStorage.getItem('shippingAddress'))//true

    const navigate = useNavigate();
    const { state , dispatch: ctxDispatch } = useContext(Store);

    const {
        cart
    } = state;

    //console.log(paymentMethod);

    console.log("payment screen:", cart.shippingAddress);

    const [ paymentMethodName , setPaymentMethod ] = useState(cart.paymentMethod || 'Stripe');

    
    useEffect(() => {
        
        if(!cart.shippingAddress.address){
            navigate('/shipping');
        }
    })
    


    const submitHandler = (e) => {

        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        console.log(paymentMethodName);
        localStorage.setItem('paymentMethod' , paymentMethodName);
        navigate('/placeorder');
    }

return (
    <div>
        <CheckoutSteps step1 step2 step3> </CheckoutSteps>
        <div className='container small-container'>
            <Helmet>
                <title>Payment Method</title>
            </Helmet>
            <h1 className='my-3'>Payment Method</h1>

            <Form onSubmit={submitHandler}>
                <div className='mb-3'>
                    <Form.Check type='radio' id='PayPal' label='PayPal' value='PayPal' checked={paymentMethodName === 'PayPal'} 
                    onChange={(e) => setPaymentMethod(e.target.value)}>

                    </Form.Check>
                </div>

                <div className='mb-3'>
                    <Form.Check type='radio' id='Stripe' label='Stripe' value='Stripe' checked={paymentMethodName === 'Stripe'} 
                    onChange={(e) => setPaymentMethod(e.target.value)}>

                    </Form.Check>
                </div>

                <div className="mb-3">
                    <Button type="submit">Continue</Button>
                </div>

            </Form>
        </div>
    </div>
)
}
