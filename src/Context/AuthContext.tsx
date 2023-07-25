import { IUser, ReducerUser } from '@/interfaces/User'
import {createContext} from 'react'

interface valuesAuth{
    status:'not-authenticated' | 'loading' | 'authenticated',
    user:ReducerUser,
    startLogin:(email:string,password:string)=>Promise<boolean>,
    errors:string | null,
    startRegister:(email:string,password:string,name:string)=>Promise<boolean>,
    startLogOut:()=>void
}

export const AuthContext=createContext({} as valuesAuth);