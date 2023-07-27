import React,{useContext,FC} from 'react'
import {Grid, Typography} from '@mui/material'
import { CartContext } from '@/Context/CartContext'
import { IOrder, IOrderItem } from '@/interfaces/Order'
import { valoresPrecios } from '@/Context/Helpers/CalculateTotal'

interface props{
    valores?:valoresPrecios,
    productosOrder?:IOrderItem[]
}

export const OrderSummary:FC<props> = ({valores,productosOrder=[]}) => {
  
   const {valoresPrecios,productos}=useContext(CartContext);

    const valorToShow=valores ? valores : valoresPrecios;

    const productosToShow=productosOrder?.length>0 ? productosOrder : productos

    return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No.Productos</Typography>
        </Grid>
        <Grid display='flex' justifyContent='end' item xs={6}>
            <Typography>{productosToShow.length} items</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid display='flex' justifyContent='end' item xs={6}>
            <Typography>${valorToShow.subtotal}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos</Typography>
        </Grid>
        <Grid display='flex' justifyContent='end' item xs={6}>
            <Typography>${valorToShow.impuestos}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}}>
            <Typography>Total:</Typography>
        </Grid>
        <Grid display='flex' sx={{mt:2}} justifyContent='end' item xs={6}>
            <Typography variant='subtitle1'>${valorToShow.total}</Typography>
        </Grid>
    </Grid>
  )
}
