import { ISizes } from "./products"

export interface ICartProducto{
    _id:string,
    images: string,
    price: number,
    sizes?: ISizes,
    slug: string,
    title: string,
    gender: 'men'|'women'|'kid'|'unisex',
    quantity:number,
    createdAt?:string,
    updatedAt?:string
}