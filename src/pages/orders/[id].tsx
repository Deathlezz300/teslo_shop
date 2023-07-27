import React from 'react'
import { ShopLayout } from '@/layouts/ShopLayout';
import { CartList } from '@/components/cart/CartList';
import { Link,Typography,Grid,Card,CardContent,Divider,Box,Button, Chip } from '@mui/material';
import { OrderSummary } from '@/components/cart/OrderSummary';
import NextLink from 'next/link';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { GetServerSideProps,NextPage } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { getOrder } from '@/database/Orders';
import { IOrder } from '@/interfaces/Order';

interface props{
    order:IOrder
}

const OrderPage:NextPage<props> = ({order}) => {


  return (
    <ShopLayout title='Resumen de orden 12345' pageDescription='Resumen de orden'>
    <Typography variant='h1' component='h1'>Orden:{order._id}</Typography>

    {
        order.isPaid===true ? <Chip sx={{my:2}} label='Pagada' color='success' variant='outlined' icon={<CreditScoreOutlined/>}/> :
         <Chip sx={{my:2}} label='Pendiente de pago' color='error' variant='outlined' icon={<CreditCardOffOutlined/>}/>
    }

    

    <Grid container sx={{mt:2}}>
        <Grid item xs={12} sm={7}>
            <CartList productos={order.orderItems} editable={false}/>
        </Grid>
        <Grid item xs={12} sm={5}>
            <Card className='summary-cart'>
                <CardContent>
                    <Typography variant='h2'>Resumen {`${order.n_productos} ${order.n_productos>1 ? 's' : ''}`}</Typography>
                    <Divider sx={{my:1}}/>

                    <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Direccion de entrega</Typography>
                    </Box>

                    <Typography variant='subtitle1'>{order.DireccionEnvio.nombre+' '+order.DireccionEnvio.apellido}</Typography>
                    <Typography variant='subtitle1'>{order.DireccionEnvio.direccion }</Typography>
                    <Typography variant='subtitle1'>{order.DireccionEnvio.cod_postal}</Typography>
                    <Typography variant='subtitle1'>{order.DireccionEnvio.country+'-'+order.DireccionEnvio.ciudad}</Typography>
                    <Typography variant='subtitle1'>{order.DireccionEnvio.telefono}</Typography>

                    <Divider sx={{my:1}}/>


                    <OrderSummary valores={{total:order.total,subtotal:order.subtotal,impuestos:order.impuestos}} productosOrder={order.orderItems}/>

                            <Box sx={{mt:3}} display='flex' flexDirection='column'>
                                
                                {
                                    order.isPaid ? <Chip sx={{my:2}} label='Pagada' color='success' variant='outlined' icon={<CreditScoreOutlined/>}/>
                                    :
                                    (
                                        <h1>Pagar</h1>
                                    )
                                }
                            </Box>

                </CardContent>
            </Card>
        </Grid>
    </Grid>

</ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req,res,params}) => {
    
    
    const {id=''}=params as {id:string};

    const session:any=await getServerSession(req,res,authOptions);
     
    if(!session){
        return {
            redirect:{
                destination:'/auth/login',
                permanent:false
            }
        }
    }

    const orderData=await getOrder(id,session.user.id);

    if(!orderData){
        return {
            redirect:{
                destination:'/orders/history',
                permanent:false
            }
        }
    }

    return {
        props: {
            order:orderData
        }
    }
}

export default OrderPage;
