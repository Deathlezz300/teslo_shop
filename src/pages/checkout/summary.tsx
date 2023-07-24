import React, { useEffect } from 'react'
import { ShopLayout } from '@/layouts/ShopLayout';
import { CartList } from '@/components/cart/CartList';
import { Link,Typography,Grid,Card,CardContent,Divider,Box,Button } from '@mui/material';
import { OrderSummary } from '@/components/cart/OrderSummary';
import NextLink from 'next/link';
import { useContext } from 'react';
import { CartContext } from '@/Context/CartContext';
import { useRouter } from 'next/router';
import { formData } from './address';
import { Loader } from '@/components/UI/Loader';

const Summary = () => {

  const {productos,direccion,status}=useContext(CartContext);

  const router=useRouter();

  useEffect(()=>{
    if(status && Object.keys(direccion).length===0){
        router.push('/checkout/address')
    }
  },[status,direccion,router])

  if(!status){
    return (<><Loader/></>)
  }

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
                    <Typography variant='h2'>Resumen {`${productos.length} Producto${productos.length>1 ? 's' : ''}`}</Typography>
                    <Divider sx={{my:1}}/>

                    <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Direccion de entrega</Typography>
                        <Link underline='always' href='/checkout/address' component={NextLink}>Editar</Link>
                    </Box>

                    <Typography variant='subtitle1'>{direccion.nombre+direccion.apellido}</Typography>
                    <Typography variant='subtitle1'>{direccion.direccion}{direccion.direccion2 ? `${direccion.direccion2}` : ''}</Typography>
                    <Typography variant='subtitle1'>{direccion.cod_postal}</Typography>
                    <Typography variant='subtitle1'>{direccion.pais}</Typography>
                    <Typography variant='subtitle1'>{direccion.telefono}</Typography>

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

export default Summary;