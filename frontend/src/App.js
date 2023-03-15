import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {AiOutlineShoppingCart} from 'react-icons/ai'

import {BrowserRouter, Routes, Route, Link, } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Navbar from'react-bootstrap/Navbar'
import Nav from'react-bootstrap/Nav'
import Badge from'react-bootstrap/Badge'


import Container from'react-bootstrap/Container'
import {LinkContainer} from'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './Store';



function App() {

  const {state} = useContext(Store);
  const {cart}= state;

  return (
    // C'est le route parent qui peret d'envelopper les routes
    // Le / permet de reconnaitre qu'on est dans la page d'accueil par défaut de localhost port 3000
    // Et path nous indique la direction à suivre
    <BrowserRouter>
    <div className='d-flex flex-column site-container' >
      <header>
        {/* BOOTSTRAP HEADER */}
        <Navbar className='Navbar' bg="" variant="dark">
          <Container>
            <LinkContainer to="/">
             <Navbar.Brand>loincloth</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link AiOutlineShoppingCart to ="/cart" className='nav-link'>
                Cart 
                <AiOutlineShoppingCart/>
                {cart.cartItems.length > 0 && (
                  <Badge pill bg ="danger">
                    {cart.cartItems.length}
                  </Badge>
                )}
              </Link>
            </Nav>
        </Container>
        </Navbar>
        {/* Link is a component from react router dom that can replace a Link=a and href=to 
        it forbide the page refrace when we clik on a product that the reason we replace a*/}
      </header>
      <main>
      <Container className='mt-3'>
        <Routes>
          <Route path="/product/:slug"element={<ProductScreen/> }/>
          <Route path="/" element={<HomeScreen />}/>
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

