import { connectMongo, disconnectMongose } from "@/database/Database";
import { IProducto } from "@/interfaces/products";
import Producto from "@/models/Producto";
import { NextApiRequest,NextApiResponse } from "next";

type Data=
    | {message:string,ok:boolean}
    | {producto:IProducto,ok:boolean}


export default function handler(req:NextApiRequest,res:NextApiResponse<Data>){

    switch(req.method){

        case 'GET':
            return getProductBySlug(req,res)

        default:
            return res.status(400).json({
                ok:false,
                message:'No existe esta ruta'
            });

    }

}

const getProductBySlug=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const {slug}=req.query;

    try{

        await connectMongo();

        const producto=await Producto.findOne({slug}).lean();


        await disconnectMongose();

        if(!producto){
            return res.status(404).json({
                ok:false,
                message:`No existe un producto por el slug ${slug}`
            })
        }

        return res.status(200).json({
            ok:true,
            producto
        })


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}