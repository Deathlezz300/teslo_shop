import { ShopLayout } from "@/layouts/ShopLayout";
import { NextPage } from "next";
import {Typography} from '@mui/material'
import { initialData } from "@/database/products";
import { ProductList } from "@/components/products/ProductList";
import { IProducto } from "@/interfaces/products";



const HomePage:NextPage=()=>{

  return(
    <ShopLayout title="Teslo Shop-Home" pageDescription="Encuentra los mejores productos
    de testlo aqui">
        <Typography variant="h1" component='h1'>Tienda</Typography>
        <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>
        
        <ProductList products={initialData as IProducto[]}/>

    </ShopLayout>
  )

}


export default HomePage;