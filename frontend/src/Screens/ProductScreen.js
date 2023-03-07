import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../Components/Rating';
import { Button } from 'bootstrap';

const reducer = (state, action) =>{
  switch(action.type){
    case'FETCH_REQUEST':
    return{...state, loading:true};
    case'FETCH_SUCCESS':
    return{...state, product:action.payload,loading:false};
    case'FETCH_FAIL':
    return{...state, loadings:false,error:action.payload};
    default:
      return state;
    
  }
 };
//To get slug from the url et showing in the Screen
//Pour obtenir le slug  (id) de l'url et l'afficher à l'écran
//on utilise le useParams pour sa

 function ProductScreen() {
    const params = useParams();
    const {slug} =params;

    const[{loading, error, product}, dispatch] = useReducer(reducer, {
      product: [],
      loading:true, 
      error:'',
    });
   // const [products, setProducts] = useState([]);
    useEffect(() => {
          //L’idée principale  de l’asynchrone est que le reste du script puisse continuer à s’exécuter pendant qu’une certaine opération plus longue ou demandant une réponse / valeur est en cours.
          // Cela permet un affichage plus rapide des pages et en une meilleure expérience utilisateur.
         //Le premier outil utilisé en JavaScript pour générer du code asynchrone a été les fonctions de rappel. 
        //En effet, une fonction de rappel ou « callback » en anglais est une fonction qui va pouvoir être rappelée (« called back ») à un certain moment et / ou si certaines conditions sont réunies.
        //L’idée ici est de passer une fonction de rappel en argument d’une autre fonction. 
        //Cette fonction de rappel va être rappelée à un certain moment par la fonction principale et pouvoir s’exécuter, sans forcément bloquer le reste du script tant que ce n’est pas le cas.
        //fetchData is a async funtion,Un objet Set permet de stocker un ensemble de valeurs uniques de n'importe quel type, qu'il s'agisse de valeurs primitives ou d'objets.
       const fetchData = async () => {
        dispatch({type: 'FETCH_REQUEST'});
        try{
          const result = await axios.get(`/api/products/slug/${slug}`);
          dispatch({type: 'FETCH_SUCCESS', payload:result.data });
        }catch(err){
          dispatch({type: 'FETCH_FAIL', payload:err.message});
  
        }
        
        //setProducts(result.data);
       };
       // The callbak function for the async function
       fetchData();
    }, [slug]);



  return (
    loading? (
    <div>Loading...</div>
    ) :error? (
    <div> {error} </div>
    ):(
    <div>
      <Row>
         {/* // For  products images */}
        <Col md={6}>
         <img className='img-large'
            src={product.Image}
            alt={product.Name}
         ></img>
        </Col> 
         {/*// For products*/}
        <Col md={3}>
          <ListGroup variant="flush">
          <ListGroup.Item>
            <h1> {product.Name} </h1>{/*pour afficher le nom du produit*/}
          </ListGroup.Item>
          <ListGroup.Item>
            {/*pour afficher le rating du produit*/}
            <Rating 
               rating={product.rating}
               numReviews={product.numReviews}
             ></Rating>
             {/*pour afficher le prix du produit*/}
             <ListGroup.Item>Prix: {product.prix} FCFA</ListGroup.Item>
          </ListGroup.Item>
          <ListGroup.Item>
            Description:
            <p> {product.description}</p>
          </ListGroup.Item>
          </ListGroup>
        </Col> 
         {/*// For products informations*/}
        <Col md={3}>
        <Card>
          <Card.Body>
           <ListGroup variant="flush">
             <ListGroup.Item>
               <Row>
                <Col>Price:</Col>
                <Col> {product.prix}FCFA</Col>
               </Row>
             </ListGroup.Item>
             <ListGroup.Item>
               <Row>
                <Col>Status:</Col>
                <Col>
                 {product.CountInStock > 0 ?(
                 <Badge bg="success">In Stock</Badge>
                 ) :(
                 <Badge bg="danger">Unavailable</Badge>
                 ) }
                </Col>
               </Row>
             </ListGroup.Item>
             {product.CountInStock> 0 && (
              <ListGroup.Item>
                <div className='d-grid'>
                  <Button variant="primary">
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>
             )
              
             }

           </ListGroup>
          </Card.Body>
        </Card>
        </Col> 
      </Row>
    </div>
    )
  );
}
export default ProductScreen;