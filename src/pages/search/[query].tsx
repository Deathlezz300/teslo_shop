import { ShopLayout } from "@/layouts/ShopLayout";
import { NextPage } from "next";
import {Typography} from '@mui/material'
import { ProductList } from "@/components/products/ProductList";
import { IProducto } from "@/interfaces/products";
import { Loader } from "@/components/UI/Loader";
import { GetServerSideProps } from 'next'
import { SearchByParams } from "@/database/GetProductGender";

interface props{
    productos:IProducto[],
    title:string,
    busqueda:string,
    pageDescription:string,
    productsFound:boolean
}

const SearchPage:NextPage<props>=({productos,title,pageDescription,productsFound,busqueda})=>{

  return(
    <ShopLayout title={title} pageDescription={pageDescription}>
        <Typography variant="h1" component='h1'>Buscar producto</Typography>
        {
            productsFound ? <Typography variant="h2" sx={{mb:1}}>Resultados para {busqueda}</Typography>
            : <Typography variant="h2" sx={{mb:1}}>No se encontraron productos</Typography>
        }
        
        <ProductList products={productos || []}/>

    </ShopLayout>
  )

}



export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const {query}=params as {query:string};

    const productos=await SearchByParams(query);

    const productsFound=productos.length>0;

    return {
        props: {
            productos,
            title:`Search ${query}`,
            productsFound,
            busqueda:query,
            pageDescription:`Pagina de resultados de la busqueda ${query}`
        }
    }
}

export default SearchPage;