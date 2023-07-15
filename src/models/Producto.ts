import { IProducto } from "@/interfaces/products";
import mongoose,{Schema,model,Model} from "mongoose";


const ProductoSchema=new Schema({
    description:{
        type:String,
        required:true
    },
    images:[{
        type:String
    }],
    inStock:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    sizes:[{
        type:String,
        enum:{
            values:['XS','S','M','L','XL','XXL','XXXL'],
            message:'{VALUE} no es un tamaño permitido'
        }
    }],
    slug:{
        type:String,
        required:true,
        unique:true
    },
    tags:[{
        type:String,
    }],
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:{
            values:['shirts','pants','hoodies','hats'],
            message:'{VALUE} no es un tipo valido'
        }
    },
    gender:{
        type:String,
        enum:{
            values:['men','women','kid','unisex'],
            message:'{VALUE} no es un genero valido'
        }
    }

},{
    timestamps:true
});

//Esto nos ayuda a crear indices de busqueda, para este caso 
//se usa para el buscador
ProductoSchema.index({title:'text',tags:'text'})


const Producto:Model<IProducto> = mongoose.models.Producto || model('Producto',ProductoSchema)

export default Producto;

