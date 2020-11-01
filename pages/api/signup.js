import initDB from '../../helpers/db'
import User from '../../models/User'
import bcrypt from 'bcryptjs'

initDB()

export default async(req,res)=>{
    switch(req.method){
        case "GET":
            await getAllUsers(req,res)
            break;
        case "POST":
            await signup(req,res)
            break;
        default:
            break;
    }
}

const getAllUsers=async(req,res)=>{
    User.find().then(users=>{
        res.json(users)
    })
}

const signup = async(req,res)=>{
    const {name,email,bio,password} =req.body
    if(!name || !email || !password){
        return res.json({err:"Please fill all the fields !"})
    }
    const user =await User.findOne({email})
    if(user){
        return res.json({err:`${email} already exist !`})
    }
    const hashedPassword =await bcrypt.hash(password,12)
    await new User({
            name,
            email,
            bio,
            password:hashedPassword
    }).save()
    res.json({message:`you are SignUp successfully !`})  
}