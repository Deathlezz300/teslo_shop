import React from 'react'
import {Grid, Typography} from '@mui/material'



export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No.Productos</Typography>
        </Grid>
        <Grid display='flex' justifyContent='end' item xs={6}>
            <Typography>3 items</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid display='flex' justifyContent='end' item xs={6}>
            <Typography>$155.33</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos</Typography>
        </Grid>
        <Grid display='flex' justifyContent='end' item xs={6}>
            <Typography>$34.33</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}}>
            <Typography>Total:</Typography>
        </Grid>
        <Grid display='flex' sx={{mt:2}} justifyContent='end' item xs={6}>
            <Typography variant='subtitle1'>$186.33</Typography>
        </Grid>
    </Grid>
  )
}
