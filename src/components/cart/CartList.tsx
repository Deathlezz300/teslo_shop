import { initialData } from '@/database/products'
import {Box, Button, CardActionArea, CardMedia, Grid,Link, Typography} from '@mui/material'
import NextLink from 'next/link'
import { ItemCounter } from '../UI/ItemCounter'
import {FC} from 'react'

const productsInCart=[
    initialData[0],
    initialData[1],
    initialData[2]
]

interface props{
    editable:boolean
}

export const CartList:FC<props> = ({editable}) => {
  return (
    <>

        {
            productsInCart.map(product=>(
                <Grid container spacing={2} sx={{mb:1}} key={product.slug}>
                    <Grid item xs={3}>
                        <Link underline='none' href={`/products/${product.slug}`} component={NextLink}>
                            <CardActionArea>
                                <CardMedia image={`/products/${product.images[0]}`}
                                    component='img' sx={{borderRadius:'5px'}}/>
                            </CardActionArea>
                        </Link>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{product.title}</Typography>
                            <Typography variant='body2'>Talla:</Typography>
                            {
                                editable ? 
                                <ItemCounter/> :
                                <Typography variant='h5'>3 items</Typography>
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1'>{product.price}</Typography>
                        {
                            editable && (<Button variant='text' color='secondary'>Remover</Button>)
                        }
                    </Grid>
                </Grid>
            ))
        }

    </>
  )
}
