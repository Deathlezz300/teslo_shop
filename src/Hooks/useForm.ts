import {useState,ChangeEvent} from 'react'
import { useEffect } from 'react'

export const useForm= <T extends object> (initalState:T)=>{

    const [form,SetForm]=useState(initalState);

    useEffect(()=>{
        SetForm(initalState);
    },[initalState]);


    const onInputChange=({target}:ChangeEvent<HTMLInputElement>)=>{
        const {value,name}=target;
        SetForm({
            ...form,
            [name]:value
        })
    }

    const onResetForm=()=>{
        SetForm(initalState);
    }

    return {
        ...form,
        onInputChange,
        onResetForm
    }

}