import React from 'react'
import { NextPage } from 'next'
import { ShopLayout } from '@/layouts/ShopLayout';
import {Grid,Box, Typography, Button} from '@mui/material'
import { initialData } from '@/database/products';
import { ProductSlideShow } from '@/components/products/ProductSlideShow';
import { ItemCounter } from '@/components/UI/ItemCounter';
import { SizeSelector } from '@/components/products/SizeSelector';

const product=initialData[0];

 const ProductPage:NextPage = () => {
  return (
    <ShopLayout title='sapo' pageDescription=''>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
                <ProductSlideShow images={product.images}/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Box display='flex' flexDirection='column'>
                    <Typography variant='h1' component='h1'>{product.title}</Typography>
                    <Typography variant='subtitle1' component='h2'>{product.price}</Typography>
                    
                    <Box sx={{my:2}}>
                        <Typography variant='subtitle2'>Cantidad</Typography>
                        <ItemCounter/>
                        <SizeSelector selectedSize={product.sizes[0]} sizes={product.sizes}/>
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


export default ProductPage;