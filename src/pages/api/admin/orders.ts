import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces/Order';
import { connectMongo, disconnectMongose } from '@/database/Database';
import Order from '@/models/Order';

type Data = | {
    ok:boolean,
    message:string
}
|{
    Ordenes:IOrder[],
    ok:boolean
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    

    switch(req.method){

        case 'GET':
            return getOrders(req,res)

        default:
            return res.status(400).json({
                ok:false,
                message:'Este endpoint no existe'
            })

    }

}

const getOrders=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    try{

        await connectMongo();

        const orders=await Order.find().sort({createdAt:'desc'}).populate('user','name email').lean();
          
        await disconnectMongose();

        return res.status(200).json({
            ok:true,
            Ordenes:orders
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}