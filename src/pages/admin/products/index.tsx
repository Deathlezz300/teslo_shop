import { AdminLayout } from '@/layouts/AdminLayout'
import { AddOutlined, CategoryOutlined } from '@mui/icons-material'
import {  Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef,GridRenderCellParams } from '@mui/x-data-grid'
import React from 'react'
import useSWR from 'swr';
import { Loader } from '@/components/UI/Loader'
import { IProducto } from '@/interfaces/products'
import NextLink from 'next/link'

const columns:GridColDef[]=[
    {
        field:'img',
        headerName:'Foto',
        renderCell:(params:GridRenderCellParams)=>{
            return(
                <a href={`/products/${params.row.slug}`} target='_blank'>
                    <CardMedia component='img' className='fadeIn' image={params.row.img}/>
                </a>
            )
        }
    },
    {field:'title',headerName:'Titulo',width:250},
    {field:'gender',headerName:'genero',width:300},
    {field:'type',headerName:'Tipo'},
    {field:'inStock',headerName:'Inventario'},
    {field:'price',headerName:'Precio'},
    {field:'sizes',headerName:'Tallas',width:250},
    {
        field:'editar',
        headerName:'Editar',
        renderCell:(params:GridRenderCellParams)=>{
            return (
                <Link color='secondary' underline='always' href={`/admin/products/${params.row.slug}`} component={NextLink}>Editar</Link>     
            )
        }
    }
];

interface peticion{
    ok:boolean,
    productos:IProducto[]
}

 const ProductsPage = () => {
  
    const {data,error}=useSWR<peticion>('/api/admin/productos')
  
    if(!data && !error){
        return <Loader/>
    }

    const rows=data!.productos.map(producto=>{
        return {
            id:producto._id,
            img:producto.images[0],
            title:producto.title,
            gender:producto.gender,
            type:producto.type,
            inStock:producto.inStock,
            price:producto.price,
            sizes:producto.sizes.join(', '),
            slug:producto.slug
        }
    })

    return (
    <AdminLayout title={`Productos ${data?.productos.length}`} subtitle='Mantenimiento de productos'
        icon={<CategoryOutlined/>}>
        <Box display='flex' justifyContent='end' sx={{mb:2}}>
            <Button
                startIcon={<AddOutlined/>}
                color='secondary'
                href='/admin/products/new'>
                Crear producto
            </Button>
        </Box>
        <Grid container sx={{mt:2}} className="fadeIn">
            <Grid item xs={12} sx={{height:650,width:'100%'}}>
                <DataGrid rows={rows} columns={columns}
                    initialState={{
                        pagination:{
                            paginationModel:{pageSize:5}
                        }
                    }}
                    pageSizeOptions={[5,10,25]}/>
            </Grid>
        </Grid>
    </AdminLayout>
  )
}

export default ProductsPage;