import jwt from 'jsonwebtoken'

export const checkAuth=(req,res,next)=>{
    try{
        
        const authorizationHeader = req.headers['authorization'];
        if (authorizationHeader) {
          const [type, token] = authorizationHeader.split(' ');
       console.log({type, token} );
          if (type.toLowerCase() === 'bearer' && token) {
            req.token = token;
            const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
            const {email,userid}=decodedToken
            req.userDetail={email,userid}
          }
        }
        next()
    }catch(e){
        res.status(401).json({ message: "Not authorize" });
    }
}