import { CartContext } from "./CartContext";
import {FC,useReducer,useEffect, useState} from 'react'
import { ActionType, cartReducer } from "./CartReducer";
import { ICartProducto } from "@/interfaces/Cart";
import Cookie from 'js-cookie'
import { AddProductCalculate, RemoveProductCalculate, calculateTotal,
     changeCantidadCalculate, valoresPrecios } from "./Helpers/CalculateTotal";
import tesloApi from "@/api/teslo_api";
import { IDireccion, IOrder } from "@/interfaces/Order";

interface props{
    children:JSX.Element | JSX.Element[]
}


export const CartProvider:FC<props>=({children})=>{
    
    const [state,dispatch]=useReducer(cartReducer,[]);

    const [valoresPrecios,SetValores]=useState<valoresPrecios>({total:0,subtotal:0,impuestos:0});

    const [status,SetStatus]=useState<boolean>(false);

    const [firtsCharge,SetCharge]=useState<boolean>(true);

    const [direccion,SetDireccion]=useState<IDireccion>({} as IDireccion);

    useEffect(()=>{
        const productos=Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
        const dataForm=Cookie.get('direccion') ? JSON.parse(Cookie.get('direccion')!) : {}
        dispatch({type:'SET-CART',payload:productos});
        SetValores(calculateTotal(productos));
        SetDireccion(dataForm);
        SetStatus(true)
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

    const ChangeDireccion=(data:IDireccion)=>{
        SetDireccion(data);
    }

    const onCreateOrder=async():Promise<boolean>=>{
        
        if(Object.keys(direccion).length===0) return false;
        
        try{

            const body:IOrder={
                orderItems:state.map(produ=>({...produ,sizes:produ.sizes!})),
                DireccionEnvio:direccion,
                n_productos:state.length,
                subtotal:valoresPrecios.subtotal,
                impuestos:valoresPrecios.impuestos,
                total:valoresPrecios.total,
                isPaid:false
            }

            const {data}=await tesloApi.post('/orders',body);

            console.log(data);

            return true

        }catch(error){
            return false;
        }
    }
    
    return(
        <CartContext.Provider value={{productos:state,onAddProductCart,LessProductoCard,RemoveFromCart,valoresPrecios,status,direccion,ChangeDireccion,onCreateOrder}}>
            {children}
        </CartContext.Provider>
    )
}