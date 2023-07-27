import { ICartProducto } from '@/interfaces/Cart'
import {createContext} from 'react'
import { valoresPrecios } from './Helpers/CalculateTotal'
import { IDireccion } from '@/interfaces/Order'


interface CartProps{
    productos:ICartProducto[],
    valoresPrecios:valoresPrecios,
    onAddProductCart:(producto:ICartProducto)=>void,
    LessProductoCard:(producto:ICartProducto)=>void,
    RemoveFromCart:(producto:ICartProducto)=>void,
    status:boolean,
    direccion:IDireccion,
    ChangeDireccion:(data:IDireccion)=>void,
    onCreateOrder:()=>Promise<{hasError:boolean,message:string}>
}

export const CartContext=createContext({} as CartProps)
