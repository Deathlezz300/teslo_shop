import { connectMongo, disconnectMongose } from '@/database/Database'
import User from '@/models/Usuario'
import { isValidToken, signToken } from '@/utils/jwt'
import type { NextApiRequest, NextApiResponse } from 'next'

interface UserLogin{
    email:string,
    role:string,
    name:string
}

type Data = 
    | {message:string,ok:boolean}
    | {token:string,ok:boolean,user:UserLogin}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){

        case 'GET':
            return validateToken(req,res)
        
        default:
            return res.status(404).json({
                ok:false,
                message:'No existe esta ruta'
            })

    }


}


const validateToken=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const {token=''}=req.cookies;

    console.log(token);

    if(token===''){
        return res.status(400).json({
            ok:false,
            message:'No hay token a validar'
        })
    }

    let userId=''

    try{

        userId=await isValidToken(token.toString());

        await connectMongo();

        const usuario=await User.findOne({_id:userId});

        await disconnectMongose();

        if(!usuario){
            return res.status(400).json({
                ok:false,
                message:'No existe un usuario con este id'
            })
        }

        const {_id,email,name,role}=usuario;

        const nuevoToken=signToken(_id,email);

        return res.status(200).json({
            ok:true,
            user:{
                email,
                role,
                name
            },
            token:nuevoToken
        })

    }catch(error){
        console.log(error);
        return res.status(401).json({
            ok:false,
            message:'Token no valido'
        })
    }


}