import { CartContext } from "./CartContext";
import {FC,useReducer,useEffect, useState} from 'react'
import { ActionType, cartReducer } from "./CartReducer";
import { ICartProducto } from "@/interfaces/Cart";
import Cookie from 'js-cookie'
import { AddProductCalculate, RemoveProductCalculate, calculateTotal,
     changeCantidadCalculate, valoresPrecios } from "./Helpers/CalculateTotal";

interface props{
    children:JSX.Element | JSX.Element[]
}


export const CartProvider:FC<props>=({children})=>{
    
    const [state,dispatch]=useReducer(cartReducer,[]);

    const [valoresPrecios,SetValores]=useState<valoresPrecios>({total:0,subtotal:0,impuestos:0});

    const [firtsCharge,SetCharge]=useState<boolean>(true);

    useEffect(()=>{
        const productos=Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
        dispatch({type:'SET-CART',payload:productos});
        SetValores(calculateTotal(productos));
    },[])

    useEffect(()=>{
        if(!firtsCharge){
            Cookie.set('cart',JSON.stringify(state));
        }
        SetCharge(false);
    },[state])

    const onAddProductCart=(producto:ICartProducto)=>{
        if(state.find(produ=>produ.slug===producto.slug && produ.sizes===producto.sizes)){
            const action:ActionType={
                type:'MORE-PRODUCT',
                payload:producto
            }

            SetValores(changeCantidadCalculate('mas',valoresPrecios,producto));
            return dispatch(action);
        }

         dispatch({type:'ADD-CART',payload:producto});
         SetValores(AddProductCalculate(valoresPrecios,producto))
    }

    const LessProductoCard=(producto:ICartProducto)=>{
        if(producto.quantity>1){
            const action:ActionType={
                type:'LESS-PRODUCT',
                payload:producto
            }

            SetValores(changeCantidadCalculate('menos',valoresPrecios,producto));
            return dispatch(action);
        }
    }

    const RemoveFromCart=(producto:ICartProducto)=>{
        const action:ActionType={
            type:'DELETE-CART',
            payload:producto
        }

        dispatch(action);
        SetValores(RemoveProductCalculate(valoresPrecios,producto))
    }
    
    return(
        <CartContext.Provider value={{productos:state,onAddProductCart,LessProductoCard,RemoveFromCart,valoresPrecios}}>
            {children}
        </CartContext.Provider>
    )
}