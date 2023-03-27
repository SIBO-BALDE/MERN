import jwt from 'jsonwebtoken';

export const generateToken = (user) =>{
    return jwt.sign(
        {
        _id:user._id,
        Name:user.Name,
        email:user.email,
        isAdmin:user.isAdmin,
        },
       
        process.env.JWT_SECRET,
        {
        expiresIn: '30d'

        }
     );
   };
