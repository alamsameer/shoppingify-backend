import jwt from 'jsonwebtoken'

export const checkAuth=(req,res,next)=>{
    try{
        const token = req.cookies.token;
        console.log(token);
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        const {email,id}=decodedToken
        console.log({email,id});
        req.userDetail={email,id}
        next()
    }catch(e){
        console.log(e)
        res.status(401).json({ message: "Not authorize" });
    }
}