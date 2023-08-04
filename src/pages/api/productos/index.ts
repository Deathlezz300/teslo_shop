import { connectMongo, disconnectMongose } from "@/database/Database";
import { SHOP_CONSTANTS } from "@/database/constants";
import { IProducto } from "@/interfaces/products";
import Producto from "@/models/Producto";
import { NextApiRequest,NextApiResponse } from "next";

// interface Data{
//     ok:boolean,
//     productos?:IProducto[],
//     message?:string
// }

type Data= 
    | {message:string,ok:boolean}
    | {productos:IProducto[],ok:boolean}

export default function handler(req:NextApiRequest,res:NextApiResponse<Data>){

    switch(req.method){
        case 'GET':
            return getProducts(req,res)

        default:
            return res.status(400).json({
                ok:false,
                message:'No existe esta ruta'
            })

    }

}

const getProducts=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const {gender='all'}=req.query;

    let condition={}

    if(SHOP_CONSTANTS.validGender.includes(gender as string)){
        condition={gender}
    }else{
        if(gender!='all'){
            return res.status(400).json({
                ok:false,
                message:`${gender} no es un genero valido`
            })
        } 
    }

    try{

        await connectMongo();

        const productos=await Producto.find(condition)
            .select('title images price inStock slug -_id').lean();

        await disconnectMongose();

        const productosUpdate=productos.map(producto=>{
            producto.images=producto.images.map(image=>{
               return image.includes('http') ? image : `${process.env.HOST_NAME}/products/${ image }`
            })

            return producto;
        });

        return res.status(200).json({
            ok:true,
            productos:productosUpdate
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}