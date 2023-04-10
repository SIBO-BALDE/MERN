import React from 'react-icons';
import './index.css';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import {BrowserRouter, Routes, Route, Link, } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Navbar from'react-bootstrap/Navbar'
import Nav from'react-bootstrap/Nav'
import Badge from'react-bootstrap/Badge'
import NavDropdown from'react-bootstrap/NavDropdown'
import Container from'react-bootstrap/Container'
import {LinkContainer} from'react-router-bootstrap'
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './CartScreen';
import SigninScreen from './Screens/SigninScreen';
import ShippingAdressScreen from './Screens/ShippingAdressScreen';
import SignupScreen from './Screens/SignupScreen ';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOderScreen from './Screens/PlaceOderScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';
import  Button  from 'react-bootstrap/Button';
import { getError } from './Utils';
import axios from 'axios';
import SearchBox from './Components/SearchBox';


// import data from '../../backend/data';



function App() {

const {state, dispatch:ctxDispatch} = useContext(Store);
const {cart, userInfo}= state;
console.log(cart)
const signoutHander = () => {
  ctxDispatch({type: 'USER_SIGNOUT'});
  localStorage.removeItem('useInfo');
  localStorage.removeItem('shippingAdress');
  localStorage.removeItem('paymentMethod');
  window.location.href='/signin';


};
//Pour creer un sidebar pour les catégorie
const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
const [categories, setCategories]= useState([]);
useEffect(()=> {
  const fetchCategories = async () => {
    try{
      const {data} = await axios.get(`/api/products/categories`);
      setCategories(data);
    }catch(err) {
      toast.error(getError(err));
    }
  };
  fetchCategories();
},[]);
  return (
    // C'est le route parent qui peret d'envelopper les routes
    // Le / permet de reconnaitre qu'on est dans la page d'accueil par défaut de localhost port 3000
    // Et path nous indique la direction à suivre
    <BrowserRouter>
    <div 
     className= {
      sidebarIsOpen
    ?'d-flex flex-column site-container active-cont'
    :'d-flex flex-column site-container'
    } 
    >
      <ToastContainer position='bottom-center' limit={1} />     
       <header>
        
        <Navbar className='Navbar' bg="" variant="dark" expand="lg">
          <Container>
            <Button  className='btn-btn' variant="dark"
            onClick={()=> setSidebarIsOpen(!sidebarIsOpen)}
            > 
                   <i className="fas fa-bars"></i>
            </Button>
            <LinkContainer to="/">
             <Navbar.Brand>loincloth</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox/>
            <Nav className="me-auto w-100 justify-content-end">
              <Link AiOutlineShoppingCart to ="/cart" className='nav-link'>
                Cart 
                <AiOutlineShoppingCart className='cart'/>
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
            </Navbar.Collapse>
        </Container>
        </Navbar>
        {/* Link is a component from react router dom that can replace a Link=a and href=to 
        it forbide the page refrace when we clik on a product that the reason we replace a*/}
      </header>
      <div
         className={
          sidebarIsOpen
          ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
          : '  side-navbar d-flex justify-content-between flex-wrap flex-column'
         }
      >
        <Nav className='flex-column text-white w-100 p-2'>
           <Nav.Item>
            <strong>Categories</strong>
           </Nav.Item>
           {categories.map((category)=> (
            <Nav.Item key={category}> 
            <LinkContainer 
            // to={`/search?category=${category}`}
            to={{pathName:`/search?category=${category}`}}
            // to={{pathName:"/search",hash:"#hash",search: "?category=abcd"}}
              onClick={() => setSidebarIsOpen(false)}

            >
              <Nav.Link> {category} </Nav.Link>
            </LinkContainer>
            </Nav.Item>

           ))}
        </Nav> 

       </div>
      <main>
      <Container className='mt-3'>
        <Routes>
          <Route path="/product/:slug"element={<ProductScreen/> }/>
          <Route path="/cart" element={<CartScreen />}/>
          <Route path="/signin" element={<SigninScreen />}/>
          <Route path="/signup" element={<SignupScreen />}/>
          <Route path="/profile" element={<ProfileScreen />}/>
          <Route path="/placeorder" element={<PlaceOderScreen />}/>
          <Route path="/order/:id" element={<OrderScreen />}/>
          <Route path="/shipping" element={<ShippingAdressScreen />}/>
          <Route path="/payment" element={<PaymentMethodScreen />}/>
          <Route path="/orderhistory" element={<OrderHistoryScreen />}/>
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
 
