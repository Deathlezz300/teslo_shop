import { IUser, ReducerUser } from '@/interfaces/User'
import {createContext} from 'react'

interface valuesAuth{
    status:'not-authenticated' | 'loading' | 'authenticated',
    user:ReducerUser,
    token:string,
    startLogin:(email:string,password:string)=>void,
    errors:string | null,
    startRegister:(email:string,password:string,name:string)=>void
}

export const AuthContext=createContext({} as valuesAuth);