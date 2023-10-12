import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter , Routes , Route, Link } from 'react-router-dom';
import HomeScreen  from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Navbar , Container, Nav, Badge } from 'react-bootstrap';
//for LinkContainer we want to install another package => react-router-bootstrap
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import Signin from './screens/Signin';


function App() {

  const { state } = useContext(Store);
  const { cart } = state;


  return (
  <BrowserRouter>
    <div className='d-flex flex-column site-container'>
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
            </Nav>
          </Container>
        </Navbar>
        
      </header>

      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/signin' element={<Signin/>} />
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
