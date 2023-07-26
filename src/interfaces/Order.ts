import { IUser } from "./User";
import { ISizes } from "./products";

export interface IOrder{
    _id?:string,
    user?:IUser | string,
    orderItems:IOrderItem[],
    DireccionEnvio:IDireccion,
    metodo_pago?:string,
    n_productos:number,
    subtotal:number,
    impuestos:number,
    total:number,
    isPaid:boolean,
    paidAt?:string
}

export interface IOrderItem{
    _id:string,
    title:string,
    sizes:ISizes,
    quantity:number,
    slug:string,
    images:string,
    price:number,
    gender:string
}

export interface IDireccion{
    nombre:string,
    apellido:string,
    direccion:string,
    direccion2?:string,
    cod_postal:string,
    ciudad:string,
    country:string,
    telefono:string
}