import jwt from 'jsonwebtoken';
import  dotenv from 'dotenv'
dotenv.config()

export const generateToken = (res,id) => {
    const token=  jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    })
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 3*24*60*60*1000,
    } )
    return token;


}

export const verifyToken = (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message:"Unauthorized-No token provided"});
    }
   try {
       const decoder = jwt.verify(token, process.env.JWT_SECRET);
       req.id = decoder.id;
       next();
   }catch(err){
       throw  new Error(`Invalid or expired token:`);
   }
}
