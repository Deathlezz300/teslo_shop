import { connectMongo, disconnectMongose } from '@/database/Database'
import { IProducto } from '@/interfaces/products'
import Producto from '@/models/Producto'
import { isValidObjectId } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import {v2 as cloudinary} from 'cloudinary';

type Data = 
    | {message:string,ok:boolean}
    | {productos:IProducto[],ok:boolean}
    | {producto:IProducto,ok:boolean}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){

        case 'GET':
            return getProductos(req,res);

        case 'PUT':
            return UpdateProduct(req,res);

        case 'POST':
            return createProducto(req,res);

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
        await disconnectMongose();
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}

const UpdateProduct=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const {_id='',images=[]}=req.body as IProducto;


    if(!isValidObjectId(_id)){
        return res.status(400).json({
            ok:false,
            message:'El id del producto no es valido'
        })
    }

    if(images.length<2){
        return res.status(400).json({
            ok:false,
            message:'Minimo dos imagenes'
        })
    }

    try{

        await connectMongo();

        const product=await Producto.findById(_id);


        if(!product){
            await connectMongo();
            return res.status(404).json({
                ok:false,
                message:'No existe este producto'
            })
        }

        product.images.forEach(async(img)=>{
            if(!images.includes(img)){
                const [fileId,fileExtension]=img.substring(img.lastIndexOf('/')+1).split('.');
                await cloudinary.uploader.destroy(fileId);
            }
        })

        await product.updateOne(req.body,{new:true});

        await disconnectMongose();

        return res.status(200).json({
            ok:true,
            producto:product
        })

    }catch(error){
        await disconnectMongose();
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Revisar backlog'
        })
    }

}

const createProducto=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const {images=[],slug}=req.body as IProducto;

    if(images.length<2){
        return res.status(400).json({
            ok:false,
            message:'Minimo dos imagenes'
        })
    }

    try{
        await connectMongo();

        const producto=await Producto.findOne({slug});

        if(producto){
            await disconnectMongose();
            return res.status(400).json({
                ok:false,
                message:'Slug repetido, intente otro'
            })
        }

        const productoSave=new Producto(req.body);

        await productoSave.save();

        await disconnectMongose();

        return res.status(200).json({
            ok:false,
            producto:productoSave
        });

    }catch(error){
        await disconnectMongose();
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Revisar los logs del servidor'
        })
    }

}
