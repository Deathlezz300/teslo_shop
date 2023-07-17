import { IProducto } from "@/interfaces/products";
import { connectMongo,disconnectMongose } from "./Database";
import Producto from "@/models/Producto";
import { SHOP_CONSTANTS } from "./constants";


export const GetProductsByGender=async(gender:string):Promise<IProducto[] | null>=>{

    if(!SHOP_CONSTANTS.validGender.includes(gender)) return null;

    try{

        await connectMongo();

        const productos=await Producto.find({gender})
            .select('title images price inStock slug -_id').lean();

        return productos;

    }catch(error){
        console.log(error);
        return null;
    }

}