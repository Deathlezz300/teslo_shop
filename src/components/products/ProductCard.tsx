import { Card,Link, Grid,CardActionArea,CardMedia,Box, Typography, Chip } from '@mui/material'
import React,{FC,useMemo,useState} from 'react'
import { IProducto } from '@/interfaces/products';
import NextLink from 'next/link';

interface props{
    producto:IProducto
}

export const ProductCard:FC<props> = ({producto}) => {
  
    const [isHovered,SetHovered]=useState<boolean>(false);

    const [isImageLoaded,SetImageLoaded]=useState<boolean>(false);
  
    const produtcImage=useMemo(()=>{
        return isHovered ? producto.images[1] :producto.images[0]
    },[isHovered,producto.images])

    return (
    <Grid item xs={6} sm={4} onMouseEnter={()=>SetHovered(true)}
        onMouseLeave={()=>SetHovered(false)}>
        <Card>
            <Link href={`/products/${producto.slug}`} underline='none' component={NextLink}>
                <CardActionArea>
                    {
                        producto.inStock===0 ?                     <Chip color='primary' label='No hay en stock'
                        sx={{position:'absolute',zIndex:99,top:'10px',left:'10px'}}/> : '' 
                    }
                    <CardMedia className='fadeIn' onLoad={()=>SetImageLoaded(true)} component='img' image={produtcImage}/>
                </CardActionArea>
            </Link>
        </Card>
        <Box className='fadeIn' sx={{mt:1,display: isImageLoaded ? 'block' : 'none'}}>
            <Typography fontWeight={700}>{producto.title}</Typography>
            <Typography fontWeight={500}>${producto.price}</Typography>
        </Box>
    </Grid>
  )
}
