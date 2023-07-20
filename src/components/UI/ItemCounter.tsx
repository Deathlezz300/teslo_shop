import React,{FC} from 'react'
import {Box, IconButton, Typography} from '@mui/material'
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material'

interface props{
  quantity:number,
  ChangeQuantity:(tipo:string)=>void
}

export const ItemCounter:FC<props> = ({quantity,ChangeQuantity}) => {
  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={()=>ChangeQuantity('menos')}>
            <RemoveCircleOutline/>
        </IconButton>
        <Typography sx={{width:40,textAlign:'center'}}>{quantity}</Typography>
        <IconButton onClick={()=>ChangeQuantity('mas')}>
            <AddCircleOutline/>
        </IconButton>
    </Box>
  )
}
