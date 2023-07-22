import {AxiosError} from 'axios'

export interface IUser{
    _id:string
    name:string,
    email:string,
    password?:string,
    role:string,
    createdAt?:string,
    updatedAt?:string
}

export interface ReducerUser{
    name:string,
    email:string,
    role:string,
    token?:string
}

export type IStatus='not-authenticated' | 'loading' | 'authenticated';