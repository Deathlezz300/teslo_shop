import { connectMongo } from '@/database/Database';
import Order from '@/models/Order';
import Producto from '@/models/Producto';
import User from '@/models/Usuario';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data={
    numberOfOrders:number,
    paidOrders:number,
    numberOfClients:number,
    numberOfProducts:number,
    producstWithNoInventory:number,
    lowInventory:number,
    notPaidOrders:number
} | 
{
    ok:boolean,
    message:string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){
        case 'GET':
            return getDashboard(req,res);


        default:
            return res.status(400).json({
                ok:false,
                message:'No existe este endpoint'
            })
    }

}

const getDashboard=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    try{

        await connectMongo();

        const [
            numberOfOrders,
            paidOrders,
            numberOfClients,
            numberOfProducts,
            producstWithNoInventory,
            lowInventory
        ]= await Promise.all([
            Order.count(),
            Order.find({isPaid:true}).count(),
            User.find({role:'client'}).count(),
            Producto.find().count(),
            Producto.find({inStock:0}).count(),
            Producto.find({inStock:{$lte:10}}).count()
        ]);

        const notPaidOrders=numberOfOrders-paidOrders;

        return res.status(200).json({
            numberOfOrders,
            numberOfClients,
            numberOfProducts,
            producstWithNoInventory,
            lowInventory,
            notPaidOrders,
            paidOrders
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}