import { ShopLayout } from "@/layouts/ShopLayout";
import { NextPage } from "next";
import {Typography} from '@mui/material'
import { ProductList } from "@/components/products/ProductList";
import { IProducto } from "@/interfaces/products";
import { useProductos } from "@/Hooks/useProducts";
import { Loader } from "@/components/UI/Loader";
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { GetProductsByGender } from "@/database/GetProductGender";
import {useState,useEffect} from 'react'

interface props{
    productos:IProducto[],
    Loading:boolean,
    title:string,
    pageDescription:string
}

const PageByGender:NextPage<props>=({productos,Loading,title,pageDescription})=>{

   const [isLoading,SetLoading]=useState<boolean>(Loading);

   useEffect(()=>{
    if(productos?.length>1){
        SetLoading(false);
    }
   },[productos])


  return(
    <ShopLayout title={title} pageDescription={pageDescription}>
        <Typography variant="h1" component='h1'>Tienda</Typography>
        <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>
        
        {
          isLoading ? <Loader/> : 
          <ProductList products={productos || []}/>
        }

    </ShopLayout>
  )

}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    
    const generos=['kid','men','women'];

    return {
        paths: generos.map(gen=>{
            return {
                params:{gender:gen}
            }
        }),
        fallback: "blocking"
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    
    const {gender}=params as {gender:string};

    const productos=await GetProductsByGender(gender);

    const Loading=!!productos;

    if(!productos){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    return {
        props: {
            productos,
            Loading,
            title:`Teslo-Shop ${gender}`,
            pageDescription:`Productos de teslo shop para ${gender}`            
        },
        revalidate:86400
    }
}

export default PageByGender;
