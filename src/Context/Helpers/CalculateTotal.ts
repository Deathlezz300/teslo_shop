import { ICartProducto } from "@/interfaces/Cart";

export interface valoresPrecios{
    subtotal:number,
    impuestos:number,
    total:number
}

export const calculateTotal=(productos:ICartProducto[]):valoresPrecios=>{

    let subtotal:number=0.0;

    productos.forEach(produ=>{
        subtotal+=produ.price*produ.quantity;
    })

    let impuestos=subtotal*0.15;

    return{
        subtotal,
        impuestos,
        total:subtotal+impuestos
    }

}


export const AddProductCalculate=(valores:valoresPrecios,producto:ICartProducto):valoresPrecios=>{

    let subtotal=valores.subtotal+(producto.price*producto.quantity);

    let impuestos=subtotal*0.15;

    return {
        subtotal,
        impuestos,
        total:subtotal+impuestos
    }
}

export const changeCantidadCalculate=(decision:string,valores:valoresPrecios,producto:ICartProducto):valoresPrecios=>{
    
    const valor=decision==='mas' ? 1 : -1;
    
    let subtotal=valores.subtotal+(producto.price*valor);

    let impuestos=subtotal*0.15;

    return {
        subtotal,
        impuestos,
        total:subtotal+impuestos
    }
}

export const RemoveProductCalculate=(valores:valoresPrecios,producto:ICartProducto):valoresPrecios=>{
    
    let subtotal=valores.subtotal-(producto.price*producto.quantity);

    let impuestos=subtotal*0.15;

    return {
        subtotal,
        impuestos,
        total:subtotal+impuestos
    }
}