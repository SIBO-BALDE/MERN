import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';

 function Product(props) {
    const{product}= props;
  return (
    
     <Card className="product" key={product.slug}> {/* Ceci permet de donner une clé unique pour chaque produit */}
              {/* Link is a component from react router dom that can replace a Link=a and href=to */}
              <Link to={`/product/${product.slug}`}>
                <img src={product.Image}className="card-img-top" alt={product.Name}/>
                </Link>
            <Card.Body> 
                <Link className='link' to={`/product/${product.slug}`}> 
                  {/* Ceci permet d'afficher le name du produit */} 
                    <Card.Title className='titre'> <p > {product.Name}</p></Card.Title> 
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                  {/* Ceci permet d'afficher le prix du produit */}
                    <Card.Text> <p><strong>{product.prix} FCFA</strong></p></Card.Text>
                    <Button  className='btn-default'>Add to  card</Button>
            </Card.Body> 
        </Card>
    
  );
}
export default Product;