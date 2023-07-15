import { connectMongo,disconnectMongose } from "@/database/Database";
import { initialData } from "@/database/products";
import Producto from "@/models/Producto";
import { NextApiRequest,NextApiResponse } from "next";


interface Data{
    mensaje:string
}

export default async function handler(req:NextApiRequest,res:NextApiResponse<Data>){
    
    if(process.env.NODE_ENV==='production'){
        return res.status(401).json({mensaje:'No tiene acceso a este servicio'})
    }

    await connectMongo();

    await Producto.deleteMany();

    await Producto.insertMany(initialData);

    await disconnectMongose();

    res.status(200).json({mensaje:'Proceso realizado correctamente'})

}