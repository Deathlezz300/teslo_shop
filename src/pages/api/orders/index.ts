import { connectMongo, disconnectMongose } from '@/database/Database'
import { IOrder } from '@/interfaces/Order'
import Order from '@/models/Order'
import Producto from '@/models/Producto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

type Data =
    | {order:IOrder,ok:boolean}
    | {message:string,ok:boolean}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){
        case 'POST':
            return RegisterOrder(req,res)
        
        default:
            return res.status(400).json({
                ok:false,
                message:'No existe este endpoint'
            })

    }


}


const RegisterOrder=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const {orderItems,total}=req.body as IOrder;
    
    const session:any=await getServerSession(req,res,authOptions);


    if(!session){
        return res.status(400).json({
            ok:false,
            message:'Debe estar autenticado'
        })
    }

    const productsId=orderItems.map(produ=>produ._id);

    try{

        await connectMongo();

        const DbProductos=await Producto.find({_id:{$in:productsId}});

        const subTotal=orderItems.reduce((prev,current)=>{
            //Recorro el arreglo retornado por mongoose de los producto traigo el producto exacto
            //en el que estoy iterando y traigo su precio
            const currentPrice=DbProductos.find(produ=>produ.id===current._id)?.price;

            if(!currentPrice){
                throw new Error('Verfique el carrito de compras')
            }

            return (current.price*current.quantity)+prev 

        },0)

        const impuestos=0.15*subTotal

        const Backtotal=subTotal+impuestos

        if(Backtotal!=total){
            await disconnectMongose();
            return res.status(400).json({
                ok:false,
                message:'Los valores a pagar no cuadran'
            })
        }

        //Apartir de aca significa que todo la data es correcta

        const userId=session.user.id;

        const newOrder=new Order({...req.body,isPaid:false,user:userId});

        await newOrder.save();

        return res.status(201).json({
            ok:true,
            order:newOrder
        })

    }catch(error){
        console.log(error);
        await disconnectMongose();
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }


}