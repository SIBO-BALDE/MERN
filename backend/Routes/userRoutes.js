import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../Utils.js';
import User from '../Models/UserModel.js';

const userRouter = express.Router();

userRouter.post(

    '/signin',
    expressAsyncHandler(async (req, res)=> {
        const user = await User.findOne({email:req.body.email});
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id:user._id,
                    Name:user.Name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:generateToken(user)
                });
                return;

            }
            

        }
        res.status(401).send({message:'Invalid email or password'});


    })
);

userRouter.post(
    '/signup',
    expressAsyncHandler(async(req, res) => {
        const newUser = new User({
            Name: req.body.Name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        });
        const user = await newUser.save();
        res.send({
            _id:user._id,
            Name:user.Name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user)
        });
    }));

export default userRouter;