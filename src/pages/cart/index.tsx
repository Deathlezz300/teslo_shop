import React from 'react'
import { NextPage } from 'next'
import { ShopLayout } from '@/layouts/ShopLayout'
import {Box,Button,Card,CardContent,Divider,Grid, Typography} from '@mui/material'
import { CartList } from '@/components/cart/CartList'
import { OrderSummary } from '@/components/cart/OrderSummary'


 const CartPage:NextPage = () => {


  return (
    <ShopLayout title='Carrito' pageDescription='Carrito de compras'>
        <Typography variant='h1' component='h1'>Carrito</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable={true}/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-cart'>
                    <CardContent>
                        <Typography variant='h2'>Orden</Typography>
                        <Divider sx={{my:1}}/>

                        <OrderSummary/>

                        <Box sx={{mt:3}}>
                            <Button color='secondary' className='circular-btn' fullWidth>Checkout</Button>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </ShopLayout>
  )
}


export default CartPage
