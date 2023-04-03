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

   export const isAuth = (req, res, next)=>{
    const authorization = req.headers.authorization;
    if (authorization) {
    // const token = authorization.slice(7, authorization.length);
    const token = authorization.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(401).send({message:'Invalide Token'});
        req.user = decoded;
            next()
    }else{
      return res.status(401).send({message: 'NO Token'});
    }
   };
