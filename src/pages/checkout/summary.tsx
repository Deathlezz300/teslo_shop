import React from 'react'
import { ShopLayout } from '@/layouts/ShopLayout';
import { CartList } from '@/components/cart/CartList';
import { Link,Typography,Grid,Card,CardContent,Divider,Box,Button } from '@mui/material';
import { OrderSummary } from '@/components/cart/OrderSummary';
import NextLink from 'next/link';


const summary = () => {
  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de orden'>
    <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

    <Grid container sx={{mt:2}}>
        <Grid item xs={12} sm={7}>
            <CartList editable={false}/>
        </Grid>
        <Grid item xs={12} sm={5}>
            <Card className='summary-cart'>
                <CardContent>
                    <Typography variant='h2'>Resumen 3 productos</Typography>
                    <Divider sx={{my:1}}/>

                    <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Direccion de entrega</Typography>
                        <Link underline='always' href='/checkout/address' component={NextLink}>Editar</Link>
                    </Box>

                    <Typography variant='subtitle1'>Alejandro Toledo</Typography>
                    <Typography variant='subtitle1'>Alguna casa</Typography>
                    <Typography variant='subtitle1'>190002</Typography>
                    <Typography variant='subtitle1'>Colombia</Typography>
                    <Typography variant='subtitle1'>+68 2372837</Typography>

                    <Divider sx={{my:1}}/>

                    <Box display='flex' justifyContent='end'>
                        <Link underline='always' href='/cart' component={NextLink}>Editar</Link>
                    </Box>

                    <OrderSummary/>

                    <Box sx={{mt:3}}>
                        <Button color='secondary' className='circular-btn' fullWidth>Confirmar orden</Button>
                    </Box>

                </CardContent>
            </Card>
        </Grid>
    </Grid>

</ShopLayout>
  )
}

export default summary;