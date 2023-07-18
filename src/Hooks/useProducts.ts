import { IProducto } from '@/interfaces/products';
import useSWR,{SWRConfiguration} from 'swr'

type peticion={
    ok:boolean,
    productos?:IProducto[],
    message?:string,
    producto?:IProducto
}

export const useProductos=(url:string,config:SWRConfiguration={})=>{
    const {data,error}=useSWR<peticion>(`http://localhost:3000/api${url}`,config);


    return{
        productos:data?.productos,
        isLoading:!error && !data,
        isError:error,
        producto:data?.producto as IProducto
    }

}