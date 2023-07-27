import { ShopLayout } from "@/layouts/ShopLayout"
import {Typography,Link,Grid,Chip} from '@mui/material'
import {DataGrid,GridColDef,GridRenderCellParams} from '@mui/x-data-grid'
import NextLink from "next/link"
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import { getOrders } from "@/database/Orders"
import { IOrder } from '../../interfaces/Order';
import { useMemo } from "react"

interface props{
    orders:IOrder[]
}

const columns:GridColDef[]=[
    {field:'id',headerName:'ID',width:100},
    {field:'fullName',headerName:'Nombre completo',width:300},
    {
        field:'paid',
        headerName:'Pagada',
        description:'Muestra informacion si esta pagada la orden o no',
        width:200,
        renderCell:(params:GridRenderCellParams)=>{
            return (
                params.row.paid ? <Chip color="success" label='Pagada' variant="outlined"/>
                : <Chip color="error" label='No pagada' variant="outlined"/>
            )
        }
    },
    {
        field:'orden',
        headerName:'Ver orden',
        width:200,
        sortable:false,
        renderCell:(params:GridRenderCellParams)=>{
            return (
                <Link underline="always" href={`/orders/${params.row.orderId}`} component={NextLink}>Ver orden</Link>
            )
        }
    }
]



 const HistoryPage:NextPage<props> = ({orders}) => {
  
    const rows=useMemo(()=>{
        return orders.map((order,index)=>{
            return{
                id:index+1,
                paid:order.isPaid,
                fullName:order.DireccionEnvio.nombre+' '+order.DireccionEnvio.apellido,
                orderId:order._id
            }
        })
    },[orders])
  
    return (
    <ShopLayout title="Historial ordenes" pageDescription="Historial ordenes del cliente">
        <Typography variant="h1" component="h1">Historial de ordenes</Typography>

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

    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req,res}) => {
    
    const session:any=await getServerSession(req,res,authOptions);

    if(!session){
        return {
            redirect:{
                destination:'/auth/login?p=/orders/history',
                permanent:false
            }
        }
    }

    const orders=await getOrders(session.user.id);

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage;
