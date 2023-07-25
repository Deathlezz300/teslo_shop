import validator from 'validator'
import mongoose,{Schema,model,Model} from "mongoose";
import { IUser } from "@/interfaces/User";
import bcrypt from 'bcryptjs'

const UserSchema=new Schema({
    name:{
        type:String,
        required:[true,"Por favor proporciona un nombre"],
        trim:true,
        maxlength:[25,"No debe tener mas de 25 caracteres"],
        minlength:[5,"Debe tener mas de 5 caracteres"] 
    },
    email:{
        type:String,
        required:[true,"Por favor proporciona un email"],
        unique:true,
        lowercase:true,
        trim:true,
        maxlength:[45,"No debe tener mas de 45 caracteres"],
        minlength:[5,"Debe tener mas de 5 caracteres"],
        validate:[validator.isEmail,"Por favor proporciona un email"]
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:{
            values:['admin','client'],
            message:'{VALUE} no es un rol valido',
            default:'client',
            required:true
        }
    }
},{
    timestamps:true
});

// UserSchema.pre('save',async function(next){
//     if(this.isModified('password')) return next()

//     this.password=await bcrypt.hashSync(this.password);

// });

const User:Model<IUser> =mongoose.models.User || model('User',UserSchema);

export default User;