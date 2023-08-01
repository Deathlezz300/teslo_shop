import { connectMongo, disconnectMongose } from '@/database/Database'
import { IUser } from '@/interfaces/User'
import User from '@/models/Usuario'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = | {
    ok:boolean,
    message:string
}
| {
    clientes:IUser[],
    ok:boolean
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch(req.method){
        
        case 'GET':
            return getClients(req,res);

        case 'PUT':
            return UpdateClinet	(req,res);
            
        default:
            return res.status(400).json({
                ok:false,
                message:'Este endpoint no existe'
            })
    }

}

const getClients=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    try{

        await connectMongo();

        const clients=await User.find().select('-password').lean();

        await disconnectMongose();

        return res.status(200).json({
            ok:true,
            clientes:clients
        })

    }catch(error){
        await disconnectMongose();
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }


}

const UpdateClinet=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const {id='',role=''}=req.body;

    if(id.length===0 || role.length===0){
        return res.status(400).json({
            ok:false,
            message:'El id y role son necesarios'
        })
    }

    try{

        await connectMongo();

        const userUpdate=await User.findById(id);


        if(!userUpdate){
            await disconnectMongose();
            return res.status(404).json({
                ok:false,
                message:'Usuario no encontrado'
            })
        }

        userUpdate.role=role;

        await userUpdate.save();

        return res.status(200).json({
            ok:true,
            message:'Usuario actualizado'
        })


    }catch(error){
        await disconnectMongose();
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}