import { IProducto, IproductSlug } from "@/interfaces/products";
import { connectMongo,disconnectMongose } from "./Database";
import Producto from "@/models/Producto";
import { SHOP_CONSTANTS } from "./constants";


export const GetProductsByGender=async(gender:string):Promise<IProducto[] | null>=>{

    if(!SHOP_CONSTANTS.validGender.includes(gender)) return null;

    try{

        await connectMongo();

        const productos=await Producto.find({gender})
            .select('title images price inStock slug -_id').lean();

        await disconnectMongose();

        return productos;

    }catch(error){
        console.log(error);
        return null;
    }

}

export const GetProductBySlug=async(slug:string):Promise<IProducto | null>=>{

    try{

        await connectMongo();

        const producto=await Producto.findOne({slug}).select('-sizes -price -inStock').lean();

        await disconnectMongose();

        if(!producto) return null;


        return JSON.parse(JSON.stringify(producto));


    }catch(error){
        console.log(error);
        return null;
    }

}


export const GetSlugs=async():Promise<IproductSlug[]> =>{


    try{

        await connectMongo();

        const slugs=await Producto.find().select('-_id slug').lean();


        return slugs;

    }catch(error){
        console.log(error);
        return [{}] as IproductSlug[]
    }

}

export const SearchByParams=async(query:string):Promise<IProducto[]>=>{

    try{

        let q=query.toString().toLowerCase();

        await connectMongo();

        //Se realiza la busqueda en mongo con mongoose por el texto
        const productos=await Producto.find({
            $text:{$search:q}
        }).select('title images price inStock slug -_id').lean()

        await disconnectMongose();

        return productos;

    }catch(error){
        console.log(error);
        return [] as IProducto[]
    }

}

export const getProductBySlugAllData=async(slug:string)=>{
    try{

        await connectMongo();

        const producto=await Producto.findOne({slug}).lean();

        await disconnectMongose();

        if(!producto) return null;


        return JSON.parse(JSON.stringify(producto));


    }catch(error){
        console.log(error);
        return null;
    }
}