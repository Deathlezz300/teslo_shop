import React,{useContext} from 'react'
import {Grid, Typography} from '@mui/material'
import { CartContext } from '@/Context/CartContext'


export const OrderSummary = () => {
  
   const {valoresPrecios,productos}=useContext(CartContext);
  
    return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No.Productos</Typography>
        </Grid>
        <Grid display='flex' justifyContent='end' item xs={6}>
            <Typography>{productos.length} items</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid display='flex' justifyContent='end' item xs={6}>
            <Typography>${valoresPrecios.subtotal}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos</Typography>
        </Grid>
        <Grid display='flex' justifyContent='end' item xs={6}>
            <Typography>${valoresPrecios.impuestos}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}}>
            <Typography>Total:</Typography>
        </Grid>
        <Grid display='flex' sx={{mt:2}} justifyContent='end' item xs={6}>
            <Typography variant='subtitle1'>${valoresPrecios.total}</Typography>
        </Grid>
    </Grid>
  )
}
