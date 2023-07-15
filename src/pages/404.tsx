import { ShopLayout } from "@/layouts/ShopLayout"
import {Box,Typography} from '@mui/material'

 const ErrorPage = () => {
  return (
    <ShopLayout title="Pagina no encontrada" pageDescription="No hay nada que mostrar">
        <Box display='flex' sx={{flexDirection:{xs:'column',sm:'row'}}} justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
            <Typography variant="h1" component='h1' fontSize={50} fontWeight={200}>404 |</Typography>
            <Typography marginLeft={2}>No se encuentra nada aqui</Typography>
        </Box>
    </ShopLayout>
  )
}

export default ErrorPage
