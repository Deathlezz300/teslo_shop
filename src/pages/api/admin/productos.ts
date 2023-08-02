import { connectMongo, disconnectMongose } from '@/database/Database'
import { IProducto } from '@/interfaces/products'
import Producto from '@/models/Producto'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
    | {message:string,ok:boolean}
    | {productos:IProducto[],ok:boolean}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){

        case 'GET':
            return getProductos(req,res);

        default:
            return res.status(400).json({
                ok:false,
                message:'Este endpoint no existe'
            })

    }


}

const getProductos=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{


    try{

        await connectMongo();

        const productos=await Producto.find().sort({title:'asc'}).lean();

        await disconnectMongose();

        return res.status(200).json({
            ok:true,
            productos
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}