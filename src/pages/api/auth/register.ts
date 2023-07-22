import { connectMongo, disconnectMongose } from '@/database/Database';
import User from '@/models/Usuario';
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/jwt';

interface UserLogin{
    email:string,
    role:string,
    name:string
}

type Data =
    | {message:string,ok:boolean}
    | {user:UserLogin,token:string,ok:boolean}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){

        case 'POST':
            return RegisterUser(req,res);
        
        default:
            return res.status(404).json({
                ok:false,
                message:'Esta ruta no existe'
            })

    }

}

const RegisterUser=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const {email,password}=req.body

    try{

        await connectMongo();

        const user=await User.findOne({email});

        if(user){
            return res.status(400).json({
                ok:false,
                message:'Este usuario ya existe'
            })
        };

        const newUser=new User(req.body);

        newUser.password=bcrypt.hashSync(password);

        await newUser.save();

        await disconnectMongose();

        const token=signToken(newUser._id,email);

        return res.status(200).json({
            ok:true,
            user:{
                name:newUser.name,
                role:newUser.role,
                email
            },
            token
        })



    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}