import mongoose from 'mongoose'

//0-Disconnected
//1-Connected
//2-Connecting
//3-Disconnecting

const mongoConnection={
    isConnected:0
}

export const connectMongo=async()=>{
    if(mongoConnection.isConnected===1){
        console.log("Ya estabamos conectados");
        return ;
    }

    if(mongoose.connections.length>0){
        mongoConnection.isConnected=mongoose.connections[0].readyState;

        if(mongoConnection.isConnected===1){
            console.log("Usando conexion anterior");
            return;
        }

        await mongoose.disconnect();

    }

    await mongoose.connect(process.env.DB_PASSWORD as string);
    mongoConnection.isConnected=1;

    console.log("conectado a mongo");


}

export const disconnectMongose=async()=>{
    
    if(process.env.NODE_ENV==='development') return;
    
    if(mongoConnection.isConnected===0) return ;

    await mongoose.disconnect();
    mongoConnection.isConnected=0;
    console.log("Desconectado");
}
