import React from 'react'
import { NextPage } from 'next'
import { ShopLayout } from '@/layouts/ShopLayout';
import {Grid,Box, Typography, Button} from '@mui/material'
import { initialData } from '@/database/products';
import { ProductSlideShow } from '@/components/products/ProductSlideShow';
import { ItemCounter } from '@/components/UI/ItemCounter';
import { SizeSelector } from '@/components/products/SizeSelector';
import { GetServerSideProps } from 'next'
import { GetProductBySlug, GetSlugs } from '@/database/GetProductGender';
import { IProducto } from '@/interfaces/products';
import { Loader } from '@/components/UI/Loader';
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { useProductos } from '@/Hooks/useProducts';

interface  props{
    product:IProducto,
}

 const ProductPage:NextPage<props> = ({product}) => {

    const {producto,isLoading}=useProductos(`/productos/${product.slug}`);

    if(isLoading){
        return <Loader/>
    }

  return (
    <ShopLayout title={product.title} pageDescription={`Esta pagina es del producto ${product.slug}`}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <ProductSlideShow images={product.images}/>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='h1' component='h1'>{product.title}</Typography>
                            <Typography variant='subtitle1' component='h2'>${producto.price}</Typography>
                            
                            <Box sx={{my:2}}>
                                <Typography variant='subtitle2'>Cantidad</Typography>
                                <ItemCounter/>
                                <SizeSelector selectedSize={producto.sizes[0]} sizes={producto.sizes}/>
                            </Box>

                            <Button color='secondary' className='circular-btn'>Agregar al carrito</Button>

                            <Box sx={{mt:3}}>
                                <Typography variant='subtitle2'>Descripcion</Typography>
                                <Typography variant='body2'>{product.description}</Typography>
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
    </ShopLayout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {
      
    const slugs=await GetSlugs();
    

    return {
        paths:slugs?.map(({slug})=>{
            return {
                params:{id:slug}
            }
        }) 
        ,
        fallback: "blocking"
    }
}




export const getStaticProps: GetStaticProps = async ({params}) => {
    
    
    const {id}=params as {id:string};

    const producto=await GetProductBySlug(id);

    if(!producto){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }    

    return {
        props: {
            product:producto
        }
    }
}

// export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
//     const {id}=params as {id:string};

//     const producto=await GetProductBySlug(id);

//     if(!producto){
//         return{
//             redirect:{
//                 destination:'/',
//                 permanent:false
//             }
//         }
//     }

//     const loading=!!producto;

//     return {
//         props: {
//             product:producto,
//             loading
//         }
//     }
// }

export default ProductPage;