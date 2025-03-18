import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res,user) => {
    try {
        // jwt sign generates a token
        const token = jwt.sign({userId:user._id,firstName:user.firstName,lastName:user.lastName},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return token;
    } catch (error) {
        console.log(`Error in generating token : ${error.message}`);
        return res.status(500).json({message:"Internal Server error!"});      
    }
};