import { AdminLayout } from '@/layouts/AdminLayout'
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React from 'react'
import NextLink from 'next/link'
import useSWR from 'swr';
import { IOrder } from '@/interfaces/Order'
import { Loader } from '@/components/UI/Loader'
import { IUser } from '@/interfaces/User'

const columns:GridColDef[]=[
    {field:'id',headerName:'Order ID',width:250},
    {field:'email',headerName:'Correo',width:250},
    {field:'name',headerName:'Nombre completo',width:300},
    {field:'total',headerName:'Monto total',width:300},
    {
        field:'isPaid',
        headerName:'Pagada',
        renderCell:(params:GridRenderCellParams)=>{
            return (
                params.row.isPaid ? <Chip color="success" label='Pagada' variant="outlined"/>
                : <Chip color="error" label='No pagada' variant="outlined"/>
            )
        }
    },
    {field:'noProductos',headerName:'No.Productos',align:'center'},
    {
        field:'check',
        headerName:'Ver orden',
        renderCell:(params:GridRenderCellParams)=>{
            return (
                <Link underline="always" href={`/admin/orders/${params.row.id}`} component={NextLink}>Ver orden</Link>
            )
        }
    },
    {field:'createdAt',headerName:'Creada en',width:300}
]

interface peticion{
    ok:boolean,
    Ordenes:IOrder[]
}

 const OrdersPage = () => {
  
    const {data,error}=useSWR<peticion>('/api/admin/orders')
  
    if(!data && !error){
        return <Loader/>
    }

    const rows=data!.Ordenes.map(orden=>{
        return {
            id:orden._id,
            email:(orden.user as IUser).email,
            name:(orden.user as IUser).name,
            total:orden.total,
            isPaid:orden.isPaid,
            noProductos:orden.n_productos,
            createdAt:orden.createdAt
        }
    })

    return (
    <AdminLayout title='Ordenes' subtitle='Todas las ordenes'
        icon={<ConfirmationNumberOutlined/>}>
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

export default OrdersPage
