import { ICartProducto } from '@/interfaces/Cart'
import {createContext} from 'react'
import { valoresPrecios } from './Helpers/CalculateTotal'
import { formData } from '@/pages/checkout/address'


interface CartProps{
    productos:ICartProducto[],
    valoresPrecios:valoresPrecios,
    onAddProductCart:(producto:ICartProducto)=>void,
    LessProductoCard:(producto:ICartProducto)=>void,
    RemoveFromCart:(producto:ICartProducto)=>void,
    status:boolean,
    direccion:formData,
    ChangeDireccion:(data:formData)=>void
}

export const CartContext=createContext({} as CartProps)
