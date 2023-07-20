import { ICartProducto } from '@/interfaces/Cart'
import {createContext} from 'react'
import { valoresPrecios } from './Helpers/CalculateTotal'


interface CartProps{
    productos:ICartProducto[],
    valoresPrecios:valoresPrecios,
    onAddProductCart:(producto:ICartProducto)=>void,
    LessProductoCard:(producto:ICartProducto)=>void,
    RemoveFromCart:(producto:ICartProducto)=>void
}

export const CartContext=createContext({} as CartProps)
