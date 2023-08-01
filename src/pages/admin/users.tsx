import tesloApi from '@/api/teslo_api';
import { Loader } from '@/components/UI/Loader';
import { IUser } from '@/interfaces/User';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PeopleOutline } from '@mui/icons-material';
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

interface peticion{
  ok:boolean,
  clientes:IUser[]
}

 const UsersPage = () => {

  const {data,error}=useSWR<peticion>('/api/admin/user')

  const [Users,SetUsers]=useState<IUser[]>([]);

  useEffect(()=>{
    if(data){
      SetUsers(data.clientes);
    }
  },[data])

  const onRoleUpdate=async(id:string,role:string)=>{

    try{

      const {data}=await tesloApi.put('/admin/user',{id,role});

      if(data.ok){
        const updatedUser=Users.map(user=>({
              ...user,
              role:user._id===id ? role : user.role
        }));

        SetUsers(updatedUser);
      }


    }catch(error){

    }

  }

  if(!data && !error){
    return <Loader/>
  }

  const rows=Users.map(cliente=>({
    id:cliente._id,
    email:cliente.email,
    name:cliente.name,
    role:cliente.role
  }))

  const columns:GridColDef[]=[
    {field:'email',headerName:'Correo',width:250},
    {field:'name',headerName:'Nombre completo',width:300},
    {
      field:'role',
      headerName:'Rol',
      width:300,
      renderCell:({row}:GridRenderCellParams)=>{
        return (
          <Select onChange={({target})=>onRoleUpdate(row.id,target.value)} value={row.role}
          label='role' sx={{width:'300px'}}>
              <MenuItem value='admin'  defaultValue='admin'>Admin</MenuItem>
              <MenuItem value='client' defaultValue='client'>Client</MenuItem>
              <MenuItem value='super-user' defaultValue='super-user'>Super-user</MenuItem>
              <MenuItem value='SEO' defaultValue='SEO'>SEO</MenuItem>
          </Select>
        )
      }
    }
  ]

  return (
    <AdminLayout title='Usuarios' subtitle='Mantenimiento de usuarios'
    icon={<PeopleOutline/>}>
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

export default UsersPage;