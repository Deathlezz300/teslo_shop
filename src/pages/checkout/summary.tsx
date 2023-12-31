import React, { useEffect } from 'react'
import { ShopLayout } from '@/layouts/ShopLayout';
import { CartList } from '@/components/cart/CartList';
import { Link,Typography,Grid,Card,CardContent,Divider,Box,Button, Chip } from '@mui/material';
import { OrderSummary } from '@/components/cart/OrderSummary';
import NextLink from 'next/link';
import { useContext,useState } from 'react';
import { CartContext } from '@/Context/CartContext';
import { useRouter } from 'next/router';
import { Loader } from '@/components/UI/Loader';
import Cookie from 'js-cookie';

const Summary = () => {

  const {productos,direccion,onCreateOrder,status}=useContext(CartContext);

  const router=useRouter();

  const [errors,SetErrors]=useState<{hasError:boolean,message:string}>({hasError:false,message:''});

  useEffect(()=>{
    if(!Cookie.get('direccion')){
        router.push('/checkout/address')
    }
  },[router])

  const createOrder=async()=>{
    if(!status) return;
    
    const isValidOrder=await onCreateOrder();

    if(isValidOrder.hasError){
        return SetErrors({hasError:true,message:isValidOrder.message})
    }

    router.replace(`/orders/${isValidOrder.message}`);

  }

  if(Object.keys(direccion).length===0){
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
                    <Typography variant='subtitle1'>{direccion.country}-{direccion.ciudad}</Typography>
                    <Typography variant='subtitle1'>{direccion.telefono}</Typography>

                    <Divider sx={{my:1}}/>

                    <Box display='flex' justifyContent='end'>
                        <Link underline='always' href='/cart' component={NextLink}>Editar</Link>
                    </Box>

                    <OrderSummary/>

                    <Box sx={{mt:3}}>
                        <Button onClick={createOrder} disabled={!status} color='secondary' className='circular-btn' fullWidth>Confirmar orden</Button>
                    </Box>

                    <Chip color='error' label={errors.message} sx={{display:errors.hasError ? 'flex' : 'none',mt:2}}/>

                </CardContent>
            </Card>
        </Grid>
    </Grid>

</ShopLayout>
  )
}

export default Summary;