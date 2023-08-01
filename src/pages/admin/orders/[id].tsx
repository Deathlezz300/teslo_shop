import { CartList } from "@/components/cart/CartList";
import { OrderSummary } from "@/components/cart/OrderSummary";
import {  getOrderAdmin } from "@/database/Orders";
import { IOrder } from "@/interfaces/Order";
import { AdminLayout } from "@/layouts/AdminLayout";
import { CreditScoreOutlined, CreditCardOffOutlined, AirplaneTicketOutlined } from "@mui/icons-material";
import { Typography, Chip, Grid, Card, CardContent, Divider, Box } from "@mui/material";
import { NextPage, GetServerSideProps } from "next";

interface props{
    order:IOrder
}



const OrderPage:NextPage<props> = ({order}) => {


  return (
    <AdminLayout title='Resumen order' subtitle={`Resumen de la orden ${order._id}`} icon={<AirplaneTicketOutlined/>}>
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
                    <Typography variant='h2'>Resumen {`${order.n_productos} ${order.n_productos>1 ? 'Productos' : 'Producto'}`}</Typography>
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

                                <Box sx={{display:'flex',flex:1}} flexDirection='column'>
                                    {
                                        order.isPaid ? <Chip sx={{my:2}} label='Pagada' color='success' variant='outlined' icon={<CreditScoreOutlined/>}/>
                                        : <Chip sx={{my:2}} label='Pendiente de pago' color='error' variant='outlined' icon={<CreditCardOffOutlined/>}/>
                                    }
                                </Box>
                            </Box>

                </CardContent>
            </Card>
        </Grid>
    </Grid>

</AdminLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    
    const {id=''}=params as {id:string};
     

    const orderData=await getOrderAdmin(id);

    if(!orderData){
        return {
            redirect:{
                destination:'/admin/orders',
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