import mongoose, {Model,model,Schema} from 'mongoose'
import { IOrder } from '../interfaces/Order';


const OrderSchema=new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    orderItems:[{
        _id:{type:Schema.Types.ObjectId,ref:'Product',required:true},
        title:{type:String,required:true},
        sizes:{type:String,required:true},
        quantity:{type:Number,required:true},
        slug:{type:String,required:true},
        images:{type:String,required:true},
        price:{type:Number,required:true},
        gender:{type:String,required:true}
    }],
    DireccionEnvio:{
        nombre:{type:String,required:true},
        apellido:{type:String,required:true},
        direccion:{type:String,required:true},
        direccion2:{type:String},
        cod_postal:{type:String,required:true},
        ciudad:{type:String,required:true},
        country:{type:String,required:true},
        telefono:{type:String,required:true}
    },
    metodo_pago:{
        type:String,
    },
    n_productos:{
        type:Number,
        required:true
    },
    subtotal:{
        type:Number,
        required:true
    },
    impuestos:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:String
    },
    transactionId:{
        type:String
    }

},{
    timestamps:true
})

const Order:Model<IOrder> =mongoose.models.Order || model('Order',OrderSchema);

export default Order;