import { ISizes } from '@/interfaces/products'
import React,{FC} from 'react'
import {Box, Button} from '@mui/material'

interface props{
    selectedSize:ISizes,
    sizes:ISizes[]
}

export const SizeSelector:FC<props> = ({selectedSize,sizes}) => {
  return (
    <Box>
        {
            sizes.map(size=>(
                <Button key={size} size='small' color={selectedSize===size ? 'primary' : 'info'}>
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
