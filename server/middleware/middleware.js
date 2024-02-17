const jwt = require('jsonwebtoken');
const User = require('../model/User');

const authenticateToken = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    // console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });

    } 
    const token = authHeader.split(' ')[1];
    
 
    if(!token){
        res.status(401).json({message: 'token not provided'});
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const{email} = decode;

        const user = await User.findOne({email});

        if(!user){
            res.status(401).json({message: 'user not found'});
        }
        // console.log(" ssssssssss \n\n"+user);
        req.user = user;
        next();
    }catch(error){
        res.status(401).json({message: 'Invalid Token',error});

    }
}

module.exports = authenticateToken