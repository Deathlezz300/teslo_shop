import jwt from 'jsonwebtoken';

export const signToken=(_id:string,email:string)=>{

    if(!process.env.JWT_SECRET_SEED){
        throw new Error('No hay semilla de JWT en .env')
    }

    return jwt.sign(
        {_id,email},
        process.env.JWT_SECRET_SEED,
        {expiresIn:'24h'}
    )

}

export const isValidToken=(token:string):Promise<string>=>{

    if(!process.env.JWT_SECRET_SEED){
        throw new Error('No hay semilla de JWT en .env')
    }

    return new Promise((resolve,reject)=>{
        try{

            jwt.verify(token,process.env.JWT_SECRET_SEED || '',(err,payload)=>{
                if(err) return reject('JWT no es valido')

                const {_id}=payload as {_id:string}

                resolve(_id);

            })            

        }catch(error){
            console.log(error);
            reject('JWT no es valido')
        }
    })

}