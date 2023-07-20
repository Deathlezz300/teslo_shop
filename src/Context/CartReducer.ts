import { ICartProducto } from "@/interfaces/Cart";

export type ActionType=
    | {type:'SET-CART',payload:ICartProducto[]}
    | {type:'ADD-CART',payload:ICartProducto}
    | {type:'DELETE-CART',payload:ICartProducto}
    | {type:'LESS-PRODUCT',payload:ICartProducto}
    | {type:'MORE-PRODUCT',payload:ICartProducto}

export const cartReducer=(state:ICartProducto[],action:ActionType)=>{

    switch(action.type){

        case 'SET-CART':
            return [...action.payload];

        case 'ADD-CART':
            return [...state,action.payload]
        
        case 'DELETE-CART':
            return state.filter(produ=>{
                return produ.slug!=action.payload.slug || produ.sizes!=action.payload.sizes;
            })
        
        case 'MORE-PRODUCT':
            return state.map(produ=>{
                if(produ.slug===action.payload.slug && produ.sizes===action.payload.sizes){
                    return {
                        ...produ,
                        quantity:produ.quantity+1
                    }
                }

                return produ;

            });

        case 'LESS-PRODUCT':
            return state.map(produ=>{
                if(produ.slug===action.payload.slug && produ.sizes===action.payload.sizes){
                    return {
                        ...produ,
                        quantity:produ.quantity-1
                    }
                }
    
                return produ;
    
            });
        
        default:
            return state;

    }

}