import React,{useState,useEffect, useContext} from 'react'
import { NextPage } from 'next'
import { ShopLayout } from '@/layouts/ShopLayout';
import {Grid,Box, Typography, Button} from '@mui/material'
import { ProductSlideShow } from '@/components/products/ProductSlideShow';
import { ItemCounter } from '@/components/UI/ItemCounter';
import { SizeSelector } from '@/components/products/SizeSelector';
import { GetProductBySlug, GetSlugs } from '@/database/GetProductGender';
import { IProducto, ISizes } from '@/interfaces/products';
import { Loader } from '@/components/UI/Loader';
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { useProductos } from '@/Hooks/useProducts';
import { ICartProducto } from '@/interfaces/Cart';
import { CartContext } from '@/Context/CartContext';

interface  props{
    product:IProducto,
}

 const ProductPage:NextPage<props> = ({product}) => {


    const {producto,isLoading}=useProductos(`/productos/${product.slug}`);

    const [TemProduct,SetTemProduct]=useState<ICartProducto>({} as ICartProducto);

    const {onAddProductCart}=useContext(CartContext);

    const onChangeSize=(size:ISizes)=>{
        SetTemProduct({
            ...TemProduct,
            sizes:size
        })
    }

    const AddProductCard=()=>{
        if(TemProduct.sizes){
            onAddProductCart(TemProduct);
        }
    }

    const onChangeQuantity=(tipo:string)=>{
        if(tipo==='mas' && producto.inStock>TemProduct.quantity){
            return SetTemProduct({
                ...TemProduct,
                quantity:TemProduct.quantity+1
            })
        }

        return TemProduct.quantity>1 ? SetTemProduct({...TemProduct,quantity:TemProduct.quantity-1}) : ''
    }

    useEffect(()=>{
        if(!isLoading){
            SetTemProduct({
                _id:product._id,
                images:product.images[0],
                price:producto.price,
                sizes:undefined,
                slug:product.slug,
                title:product.title,
                gender:product.gender,
                quantity:1
            })
        }
    },[producto,isLoading])

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
                                <ItemCounter quantity={TemProduct.quantity} ChangeQuantity={onChangeQuantity}/>
                                <SizeSelector ChangeSize={onChangeSize} selectedSize={TemProduct.sizes} sizes={producto.sizes}/>
                            </Box>

                            {
                                producto.inStock>0 ? <Button onClick={AddProductCard} color='secondary' className='circular-btn'>
                                {
                                    TemProduct.sizes ? 'Agregar al carrito' : 'Seleccione una talla'
                                }
                                </Button> : ''
                            }

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