import jwt from 'jsonwebtoken'

export const checkAuth=(req,res,next)=>{
    try{
        const token = req.cookies.token;
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        const {email,userid}=decodedToken
        req.userDetail={email,userid}
        next()
    }catch(e){
        console.log(e)
        res.cookie('token',"", {
            secure: true,
            httpOnly: true,
            sameSite: 'none'
          });
        res.status(401).json({ message: "Not authorize" });
    }
}