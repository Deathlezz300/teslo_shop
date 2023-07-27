import { IOrder } from "@/interfaces/Order";
import Order from "@/models/Order";
import { connectMongo, disconnectMongose } from "./Database";

export const getOrder=async(id:string,idUser:string):Promise<IOrder | null>=>{

    if(id.length===0) return null;

    try{

        await connectMongo();

        const order=await Order.findOne({_id:id,user:idUser}).lean();

        await disconnectMongose();

        if(!order) return null;

        return JSON.parse(JSON.stringify(order));

    }catch(error){
        return null;
    }


}

export const getOrders=async(userId:string):Promise<IOrder[]>=>{

    try{
         
        await connectMongo();

        const orders=await Order.find({user:userId}).lean();

        await disconnectMongose();

        return JSON.parse(JSON.stringify(orders));


    }catch(error){
        return [];
    }

}