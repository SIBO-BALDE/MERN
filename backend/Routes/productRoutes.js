import express from 'express';
import Product from '../Models/ProductModel.js';


const productRouter = express.Router();
productRouter.get('/', async (req,res)=>{
    const products=await Product.find();
    res.send(products);
});

// Copie de l'api pour aficher les details de l'api si on clik sur le produit
productRouter.get('/slug/:slug', async(req, res) => {
    const product = await Product.findOne({slug:req.params.slug});
    if(product) {
        res.send(product);
    }
    else {
        res.status(400).send({message: 'Product Not Found'})
    }

    
});

// Copie de l'api pour aficher les details de l'api si on clik sur le produit
productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    }
    else {
        res.status(400).send({message: 'Product Not Found'})
    }

    
});
 
export default productRouter;