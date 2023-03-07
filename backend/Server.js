          //Création d'un api
          //import express 
import express  from "express";
import data from "./data.js";


        // Create express application ,express is a function just all it to returan object which is
       // the express app

const app = express();

      //This object has a methode named get and this methode has two parameter
     //the url that we are going to serve and the seconde parameter is the function that respond
    //the api when user go to this address we need to return products to the frontend to the user this function
   //the function accept two parameter requestand response object and inside this we need use 
  // res. send()to sen data in the frontend

 
// app.get('/api/products', (req, res) => {
    // res.send(data.products);
// });
app.get('/api/products', (req, res) => {
    res.send(data.products);
});
// Copie de l'api pour aficher les details de l'api si on clik sur le produit
app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug);
    if(product) {
        res.send(product);
    }
    else {
        res.status(400).send({message: 'Product Not Found'})
    }

    
});
 
      //Define the port we are t respond
const port = process.env.PORT || 5000;
     //call app.listen the server will be ready to response first parameter is the port et the seconde is the  callback
app.listen(port, () =>{
    console.log(`serve at http://localhost:${port}`);
});