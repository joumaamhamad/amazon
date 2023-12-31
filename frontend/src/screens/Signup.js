import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

function Signup(){

    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/'

    const [name , setName ] = useState('');
    const [email , setEmail ] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword ] = useState('');

    const {state , dispatch: ctxDispatch} = useContext(Store);
    const { cart , userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error('Password do not match')
            return;
        }
        try{

            const { data } = await axios.post('/api/users/signup' , {
                name,
                email,
                password
            });

            ctxDispatch({ type: 'USER_SIGNIN' , payload: data });
            localStorage.setItem('userInfo' , JSON.stringify(data));
            navigate(redirect || '/');

        }catch(err){

            toast.error(getError(err));
        }
    }

    //A login user cant do a signin
    useEffect(() => {
        if(userInfo){
            navigate(redirect);

        }
    } , [navigate , redirect , userInfo])

    return(
        
        <Container className="small-container">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className="my-3">Sign Up</h1>

            <Form onSubmit={submitHandler}>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" required onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <div className="mb-3">
                        <Button type="submit"> Sign Up </Button>
                    </div>
                    <div className="mb-3">
                        Already have an account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Signup;