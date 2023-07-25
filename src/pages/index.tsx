import { ShopLayout } from "@/layouts/ShopLayout";
import { NextPage } from "next";
import {Typography} from '@mui/material'
import { ProductList } from "@/components/products/ProductList";
import { IProducto } from "@/interfaces/products";
import { useProductos } from "@/Hooks/useProducts";
import { Loader } from "@/components/UI/Loader";


const HomePage:NextPage=()=>{

   const {productos,isLoading}=useProductos('/productos');

  return(
    <ShopLayout title="Teslo Shop-Home" pageDescription="Encuentra los mejores productos
    de testlo aqui">
        <Typography variant="h1" component='h1'>Tienda</Typography>
        <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>
        
        {
          isLoading ? <Loader/> : 
          <ProductList products={productos as IProducto[] || []}/>
        }

    </ShopLayout>
  )

}


export default HomePage;