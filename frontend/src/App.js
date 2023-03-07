import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {BrowserRouter, Routes, Route, } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Navbar from'react-bootstrap/Navbar'
import Container from'react-bootstrap/Container'
import {LinkContainer} from'react-router-bootstrap'



function App() {
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
        </Container>
        </Navbar>
        {/* Link is a component from react router dom that can replace a Link=a and href=to 
        it forbide the page refrace when we clik on a product that the reason we replace a*/}
      </header>
      <main>
      <Container>
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

