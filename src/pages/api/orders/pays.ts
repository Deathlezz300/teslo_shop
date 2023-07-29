import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import axios from 'axios'
import { PaypalBearOrder } from '@/interfaces/paypal'
import { connectMongo, disconnectMongose } from '@/database/Database'
import Order from '@/models/Order'

type Data =
    | {message:String,ok:boolean}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    

    switch(req.method){
        
        case 'POST':
            return payOrder(req,res)

        default:
            return res.status(400).json({
                ok:false,
                message:'No existe este endpoint'
            })

    }

}

const getPaypalBearerToken=async():Promise<string | null>=>{

    const paypalClient=process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
    const paypalSecret=process.env.PAYPAL_SECRET;

    try{

        const based64Token=Buffer.from(`${paypalClient}:${paypalSecret}`,'utf-8').toString('base64');
        const body=new URLSearchParams('grant_type=client_credentials');

        const {data}=await axios.post(process.env.PAYPAL_OAUTH_URL || '',body,{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':`Basic ${based64Token}`
            }
        });


        return data.access_token;

    }catch(error){
        if(axios.isAxiosError(error)){
            console.log(error.response?.data);
        }else{
            console.log(error);
        }

        return null;
    }
    
}

const payOrder=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const session:any=await getServerSession(req,res,authOptions);

    if(!session){
        return res.status(201).json({
            ok:false,
            message:'Debe estar autenticado'
        })
    };

    const paypalToken=await getPaypalBearerToken();

    if(!paypalToken){
        return res.status(400).json({
            ok:false,
            message:'No se pudo generar el token'
        })
    }

    const {transactionId='',orderId=''}=req.body;

    if(transactionId.length===0 || orderId.length===0){
        return res.status(400).json({
            ok:false,
            message:'transactionId o orderId faltan en los parametros'
        })
    }

    const {data}=await axios.get<PaypalBearOrder>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,{
        headers:{
            'Authorization':`Bearer ${paypalToken}`
        }
    });

    if(data.status!='COMPLETED'){
        return res.status(401).json({
            ok:false,
            message:'Orden no reconocida'
        })
    }

    await connectMongo();

    const dbOrder=await Order.findById(orderId);


    if(!dbOrder){
        await disconnectMongose();
        return res.status(400).json({
            ok:false,
            message:'Orden no existe en la base de datos'
        })
    }

    if(dbOrder.total!=Number(data.purchase_units[0].amount.value)){
        await disconnectMongose();
        return res.status(400).json({
            ok:false,
            message:'Los montos de paypal y nuestra orden no son iguales'
        })
    }

    dbOrder.transactionId=transactionId;
    dbOrder.isPaid=true;

    await dbOrder.save();

    await disconnectMongose();

    return res.status(200).json({
        ok:true,
        message:'Orden pagada'
    })

}