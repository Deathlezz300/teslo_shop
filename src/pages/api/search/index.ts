import { NextApiRequest,NextApiResponse } from "next";

type Data={
    ok:boolean,
    message:string
}


export default function handler(req:NextApiRequest,res:NextApiResponse<Data>){
    return res.status(404).json({
        ok:false,
        message:'No existe un endpoint aqui'
    })
}