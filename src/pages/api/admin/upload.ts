import type { NextApiRequest, NextApiResponse } from 'next'
import formidable,{IncomingForm,File} from 'formidable'
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = 
    | {message:string,ok:boolean}
    | {image:string,ok:boolean}

export const config={
    api:{
        bodyParser:false
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){

        case 'POST':
            return UploadImages(req,res);

        default:
            return res.status(400).json({
                ok:false,
                message:'No existe este endpoint'
            })

    }

}

const saveFile=async(file:File):Promise<string>=>{

    // const data=fs.readFileSync(file.filepath);
    // fs.writeFileSync(`./public/${file.originalFilename}`,data);
    // fs.unlinkSync(file.filepath);

    // return;
    const {secure_url}=await cloudinary.uploader.upload(file.filepath);
    return secure_url;
}

const parsedFiles=async(req:NextApiRequest):Promise<string>=>{

    return new Promise((resolve,reject)=>{

        const form=new IncomingForm();

        form.parse(req,async(err,fields,files:any)=>{
            if(err) return reject(err);

           const pathFile=await saveFile(files.file[0] as File)
           resolve(pathFile) 

        })

    })

}

const UploadImages=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{


    try{

        const url=await parsedFiles(req);

        return res.status(200).json({
            ok:true,
            image:url
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:true,
            message:'Ha ocurrido un error'
        })
    }

}