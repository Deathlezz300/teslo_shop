import { Loader } from '@/components/UI/Loader'
import { SummaryTie } from '@/components/UI/SummaryTie'
import { DashboardSummary } from '@/interfaces/Dashborad'
import { AdminLayout } from '@/layouts/AdminLayout'
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React,{useState,useEffect} from 'react'
import useSWR from 'swr';

 const DashboradPage = () => {

   const {data,error}=useSWR<DashboardSummary>('/api/admin/dashboard',{
        refreshInterval:30*1000
   });

   const [refresh,SetRefresh]=useState<number>(30);

   useEffect(()=>{
        if(!data && !error) return;
        const interval=setInterval(()=>{
            SetRefresh((c)=>c>0 ? c-1 : 30)
        },1000)

        return ()=>{
            clearInterval(interval);
        }

    },[data,error])

   if(!error && !data){
        return <Loader/>
   }

   const {
        numberOfOrders,          
        numberOfClients,         
        numberOfProducts,       
        producstWithNoInventory, 
        lowInventory,            
        notPaidOrders,           
        paidOrders
    }=data!

  return (
    <AdminLayout title='Dashborad' subtitle='Estadisticas generales'
        icon={<DashboardOutlined/>}>
         <Grid container spacing={2}>
            <SummaryTie title={numberOfOrders} subtitle='Ordenes totales' icon={<CreditCardOutlined color='secondary' sx={{fontSize:40}}/>}/>
            <SummaryTie title={paidOrders} subtitle='Ordenes pagadas' icon={<AttachMoneyOutlined color='success' sx={{fontSize:40}}/>}/>
            <SummaryTie title={notPaidOrders} subtitle='Ordenes pendientes' icon={<CreditCardOffOutlined color='error' sx={{fontSize:40}}/>}/>
            <SummaryTie title={numberOfClients} subtitle='Clientes' icon={<GroupOutlined color='primary' sx={{fontSize:40}}/>}/>
            <SummaryTie title={numberOfProducts} subtitle='Productos' icon={<CategoryOutlined color='warning' sx={{fontSize:40}}/>}/>
            <SummaryTie title={producstWithNoInventory} subtitle='Sin existencias' icon={<CancelPresentationOutlined color='error' sx={{fontSize:40}}/>}/>
            <SummaryTie title={lowInventory} subtitle='Bajo inventario' icon={<ProductionQuantityLimitsOutlined color='warning' sx={{fontSize:40}}/>}/>
            <SummaryTie title={refresh} subtitle='Actualizacion en' icon={<AccessTimeOutlined color='secondary' sx={{fontSize:40}}/>}/>
         </Grid>
    </AdminLayout>
  )
}

export default DashboradPage;