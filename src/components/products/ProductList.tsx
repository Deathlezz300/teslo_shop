import React,{FC} from 'react'
import {Grid} from '@mui/material'
import { IProducto } from '@/interfaces/products'
import { ProductCard } from './ProductCard'

interface props{
    products:IProducto[]
}

export const ProductList:FC<props> = ({products}) => {
  return (
    <Grid container spacing={4}>
        {
            products.map(produ=>(
                <ProductCard key={produ.slug} producto={produ}/>
            ))
        }
    </Grid>
  )
}
