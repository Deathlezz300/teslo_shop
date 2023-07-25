import User from "@/models/Usuario";
import { connectMongo, disconnectMongose } from "./Database"
import bcrypt from 'bcryptjs'

export const CheckUserEmailPassword=async(email:string,password:string)=>{

    await connectMongo();

    const user=await User.findOne({email});

    await disconnectMongose();

    if(!user) return null;

    if(!bcrypt.compareSync(password,user.password!)){
        return null;
    }

    const {role,name,_id}=user;


    return {
        id:_id,
        role,
        name,
        email
    }

}

export const registerUser=async(oAuthEmail:string,oAuthName:string)=>{


    await connectMongo();


    const user=await User.findOne({email:oAuthEmail});

    if(user){
        await disconnectMongose();
        const {_id,name,email,role}=user;

        return {id:_id,name,email,role}
    }

    const newUser=new User({email:oAuthEmail,name:oAuthName,password:'@',role:'client'});

    await newUser.save();

    await disconnectMongose();

    const {_id,name,email,role}=newUser;

    return {
        id:_id,
        name,
        email,
        role
    }

}