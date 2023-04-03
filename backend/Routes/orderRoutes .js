import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../Utils.js';
import Order from '../Models/OrderModel.js';
import {isAuth} from '../Utils.js';

const orderRouter = express.Router();
orderRouter.post('/', isAuth, expressAsyncHandler(async (req,res) => {
const newOrder = new Order({
    orderItems: req.body.orderItems.map((X) => ({...X, product: X._id})),
    shippingAdress: req.body.shippingAdress,
    paymentMethod: req.body.paymentMethod,
    itemsPrix: req.body.itemsPrix,
    shippingPrix: req.body.shippingPrix,
    taxPrix: req.body.taxPrix,
    totalPrix: req.body.totalPrix,
    user: req.user._id,

});
const order = await newOrder.save();
res.status(201).send({message: 'New Order Created', order})
}));

orderRouter.get(
  '/mine',
  isAuth, 
    expressAsyncHandler(async (req,res) => {
      const orders = await Order.find({user: req.user._id});
      res.send(orders);
    })
    );
orderRouter.get(
    '/:id', 
    isAuth, 
    expressAsyncHandler(async (req,res) => {
      const order = await Order.findById(req.params.id);
      if (order){
        res.send(order);
      }else{
        res.status(404).send({message: 'Order Not Found'});
      }

})
);

orderRouter.put(
  '/:id/pay', 
  isAuth, 
  expressAsyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);
    if(order){
      order.isPaid=true;
      order.pAtaid=Date.now();
      order.paymentResult={
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_adress: req.body.email_adress,
      };
      const updateOrder = await order.save();
      res.send({message:'Order Paid',order:updateOrder});
      
    }else{
      res.status(404).send({message:'Order Not Found'});
    }
  }) 
  );

   

export default orderRouter;