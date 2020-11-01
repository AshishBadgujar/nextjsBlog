import initDB from '../../helpers/db'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

initDB()

export default async(req,res)=>{
    const {email,password} =req.body
    if(!email || !password){
        return res.json({err:"Please fill all the fields !"})
    }
    const user =await User.findOne({email})
    if(!user){
        return res.json({err:`${email} does't exist !`})
    }
    const domatch=await bcrypt.compare(password,user.password)
    if(domatch){
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:'7d'
        })
        const {_id,name,email}=user
        res.json({token,user:{_id,name,email}})
    }else{
        return res.json({err:'Password incorrect!'})
    }
    res.json({message:`you are SignUp successfully !`})  
}