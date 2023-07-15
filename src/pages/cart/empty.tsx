import { ShopLayout } from '@/layouts/ShopLayout'
import React from 'react'
import {Box, Typography,Link} from '@mui/material'
import {RemoveShoppingCartOutlined} from '@mui/icons-material'
import  NextLink from 'next/link'

 const empty = () => {
  return (
    <ShopLayout title='Carrito vacio' pageDescription='No hay articulos en el carrito'>
        <Box>
            <Box display='flex' justifyContent='center' alignItems='center'
                height='calc(100vh - 200px)' sx={{flexDirection:{xs:'column',sm:'row'}}}>
                <RemoveShoppingCartOutlined sx={{fontSize:100}}/>
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography>Su carrito esta vacio</Typography>
                    <Link typography='h4' color='secondary' href='/' underline='none' component={NextLink}>Regresar</Link>
                </Box>
            </Box>
        </Box>
    </ShopLayout>
  )
}

export default empty