import { connectMongo, disconnectMongose } from '@/database/Database';
import User from '@/models/Usuario';
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/jwt';
import { isValidEmail } from '@/utils/validation';

interface UserLogin{
    email:string,
    role:string,
    name:string
}

type Data =
    | {message:string,ok:boolean}
    | {user:UserLogin,token:string,ok:boolean}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){
        
        case 'POST':
            return LoginUser(req,res)
        default:
            return res.status(404).json({
                ok:false,
                message:'No existe esta ruta'
            })

    }

}


const LoginUser=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{


    const {email,password}=req.body;


    
    if(!isValidEmail(email)){
        return res.status(400).json({
            ok:false,
            message:'El correo no es valido'
        })
    }

    try{

        await connectMongo();

        const user=await User.findOne({email});

        await disconnectMongose();

        if(!user){
            return res.status(400).json({
                ok:false,
                message:'Este usuario no existe'
            })
        }

        if(!bcrypt.compareSync(password,user.password!)){
            return res.status(400).json({
                ok:false,
                message:'Credenciales incorrectas'
            })
        };

        const token=signToken(user._id,email);

        return res.status(200).json({
            ok:true,
            user:{
                email:user.email,
                role:user.role,
                name:user.name
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

