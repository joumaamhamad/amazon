import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter , Routes , Route, Link } from 'react-router-dom';
import HomeScreen  from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Navbar , Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
//for LinkContainer we want to install another package => react-router-bootstrap
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import Signin from './screens/Signin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import Signup from './screens/Signup';
import PaymentMethodScreen from './screens/PaymentMethodScreen';


function App() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart , userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
  <BrowserRouter>
    <div className='d-flex flex-column site-container'>
      <ToastContainer position='bottom-center' limit={1}></ToastContainer>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
                <Navbar.Brand>amazon</Navbar.Brand>
            </LinkContainer>
            <Nav>
              <Link to='/cart' className='nav-link'>
                Cart
                {
                  cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a , c) => a + c.quantity , 0)}
                    </Badge>
                  )
                }
              </Link>
              {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">

                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider />

                    <Link className="dropdown-item" to="#signout" onClick={signoutHandler}> 
                        Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
            </Nav>
          </Container>
        </Navbar>
        
      </header>

      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/shipping' element={<ShippingAddressScreen/>} />
            <Route path='/payment' element={<PaymentMethodScreen />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>

      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>

    </div>
  </BrowserRouter>
  );
}

export default App;
