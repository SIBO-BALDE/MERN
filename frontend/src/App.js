import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter, Routes, Route, Link, } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Navbar from'react-bootstrap/Navbar'
import Nav from'react-bootstrap/Nav'
import Badge from'react-bootstrap/Badge'
import NavDropdown from'react-bootstrap/NavDropdown'
import Container from'react-bootstrap/Container'
import {LinkContainer} from'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './CartScreen';
import SigninScreen from './Screens/SigninScreen';
import ShippingAdressScreen from './Screens/ShippingAdressScreen';
import SignupScreen from './Screens/SignupScreen ';



function App() {

const {state, dispatch:ctxDispatch} = useContext(Store);
const {cart, userInfo}= state;
const signoutHander = () => {
  ctxDispatch({type: 'USER_SIGNOUT'});
  localStorage.removeItem('useInfo');
  localStorage.removeItem('shippingAdress');


}
  return (
    // C'est le route parent qui peret d'envelopper les routes
    // Le / permet de reconnaitre qu'on est dans la page d'accueil par défaut de localhost port 3000
    // Et path nous indique la direction à suivre
    <BrowserRouter>
    <div className='d-flex flex-column site-container' >
      <ToastContainer position='bottom-center' limit={1} />      <header>
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
                    {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.Name} id="basic-nav-dropdown">
                    <LinkContainer to='/profile'>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderhistory'>
                       <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link 
                    className='dropdown-item'
                     to="#signout" onClick={signoutHander}
                     > 
                     signout
                    
                    </Link>
                </NavDropdown> 
                 ) : (
                  <Link className="nav-link" to='/signin'>
                Sign In
                </Link>
              )}

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
          <Route path="/cart" element={<CartScreen />}/>
          <Route path="/signin" element={<SigninScreen />}/>
          <Route path="/signup" element={<SignupScreen />}/>
          <Route path="/shipping" element={<ShippingAdressScreen />}/>
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

