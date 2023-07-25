import { initialData } from '@/database/products'
import {Box, Button, CardActionArea, CardMedia, Grid,Link, Typography} from '@mui/material'
import NextLink from 'next/link'
import { ItemCounter } from '../UI/ItemCounter'
import {FC} from 'react'
import { useContext } from 'react'
import { CartContext } from '@/Context/CartContext'
import { ICartProducto } from '@/interfaces/Cart'
import { useRouter } from 'next/router'

interface props{
    editable:boolean
}

export const CartList:FC<props> = ({editable}) => {

    const router=useRouter();

  const {productos:productsInCart,onAddProductCart,LessProductoCard,RemoveFromCart}=useContext(CartContext);


  const onChangeQuantity=(tipo:string,producto:ICartProducto)=>{
        if(tipo==='mas'){
            return onAddProductCart(producto);
        }

        return LessProductoCard(producto);
  }


  return (
    <>

        {
            productsInCart.map((product,index)=>(
                <Grid container spacing={2} sx={{mb:1}} key={index}>
                    <Grid item xs={3}>
                        <Link underline='none' href={`/products/${product.slug}`} component={NextLink}>
                            <CardActionArea>
                                <CardMedia image={`/products/${product.images}`}
                                    component='img' sx={{borderRadius:'5px'}}/>
                            </CardActionArea>
                        </Link>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{product.title}</Typography>
                            <Typography variant='body2'>Talla:{product.sizes}</Typography>
                            {
                                editable ? 
                                <ItemCounter quantity={product.quantity} ChangeQuantity={(tipo:string)=>onChangeQuantity(tipo,product)}/> :
                                <Typography variant='h5'>{product.quantity} Producto{product.quantity>1 ? 's' : ''}</Typography>
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1'>${product.price}</Typography>
                        {
                            editable && (<Button onClick={()=>RemoveFromCart(product)} variant='text' color='secondary'>Remover</Button>)
                        }
                    </Grid>
                </Grid>
            ))
        }

    </>
  )
}
