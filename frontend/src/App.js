import React from 'react';
import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import HomeScreen  from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Navbar , Container } from 'react-bootstrap';
//for LinkContainer we want to install another package => react-router-bootstrap
import { LinkContainer } from 'react-router-bootstrap';


function App() {
  return (
  <BrowserRouter>
    <div className='d-flex flex-column site-container'>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
                <Navbar.Brand>amazon</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
        
      </header>

      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />} />
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
