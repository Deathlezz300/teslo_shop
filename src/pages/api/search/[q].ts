import { connectMongo, disconnectMongose } from "@/database/Database";
import { IProducto } from "@/interfaces/products";
import Producto from "@/models/Producto";
import { NextApiRequest,NextApiResponse } from "next";


type Data=
| {message:string,ok:boolean}
| {productos:IProducto[],ok:boolean}


export default function handler(req:NextApiRequest,res:NextApiResponse<Data>){

    switch(req.method){

        case 'GET':
            return searchProducts(req,res);
        
        default:
            return res.status(404).json({
                ok:false,
                message:'No existe esta ruta'
            })

    }

}


const searchProducts=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    let {q=''}=req.query;

    if(q.length===0){
        res.status(400).json({
            ok:false,
            message:'Ingresar un parametro de busqueda valido'
        })
    }

    try{

        q=q.toString().toLowerCase();

        await connectMongo();

        //Se realiza la busqueda en mongo con mongoose por el texto
        const productos=await Producto.find({
            $text:{$search:q}
        }).select('title images price inStock slug -_id').lean()

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