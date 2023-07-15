import { ShopLayout } from "@/layouts/ShopLayout"
import {Typography,Link,Grid,Chip} from '@mui/material'
import {DataGrid,GridColDef,GridRenderCellParams} from '@mui/x-data-grid'
import NextLink from "next/link"

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
                <Link underline="always" href={`/orders/${params.row.id}`} component={NextLink}>Ver orden</Link>
            )
        }
    }
]

const rows=[
    {id:1,paid:true,fullName:'Alejandro Toledo'},
    {id:2,paid:false,fullName:'Ejemplo 2'},
    {id:3,paid:true,fullName:'Ejemplo 3'},
]

 const history = () => {
  return (
    <ShopLayout title="Historial ordenes" pageDescription="Historial ordenes del cliente">
        <Typography variant="h1" component="h1">Historial de ordenes</Typography>

        <Grid container sx={{mt:2}}>
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

export default history
