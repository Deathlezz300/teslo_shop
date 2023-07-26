import { NextPage } from "next"
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material'
import { ShopLayout } from "@/layouts/ShopLayout";
import { countries } from "@/utils/countries";
import {useForm} from 'react-hook-form'
import Cookie from 'js-cookie'
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "@/Context/CartContext";
import { IDireccion } from "@/interfaces/Order";
// import { GetServerSideProps } from 'next'
// import { isValidToken } from "@/utils/jwt";



 const AddressPage:NextPage = () => {

  const router=useRouter();

  const {ChangeDireccion}=useContext(CartContext);

  const {register,handleSubmit,formState:{errors}}=useForm<IDireccion>({
    defaultValues:JSON.parse(Cookie.get('direccion') || '{}')
  });

  const onSubmitAddres=(data:IDireccion)=>{
    Cookie.set('direccion',JSON.stringify(data));
    ChangeDireccion(data);
    router.push('/checkout/summary')
  }


  return (
    <ShopLayout title="Direccion" pageDescription="Confirmar direccion de destino">
        <Typography variant="h1" component='h1'>Direccion</Typography>

        <form id="form3" onSubmit={handleSubmit(onSubmitAddres)}>
            <Grid container spacing={2} sx={{mt:2}}>
                <Grid item xs={12} sm={6}>
                    <TextField {...register('nombre',{
                        required:'Este campo es obligatorio'
                    })} error={!!errors.nombre} helperText={errors.nombre?.message} label='Nombre' variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...register('apellido',{
                        required:'Este campo es obligatorio'
                    })} error={!!errors.apellido} helperText={errors.apellido?.message} label='Apellido' variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...register('direccion',{
                        required:'Este campo es obligatorio'
                    })} error={!!errors.direccion} helperText={errors.direccion?.message} label='Direccion' variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...register('direccion2')} label='Direccion 2' variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...register('cod_postal',{
                        required:'Este campo es obligatorio'
                    })} error={!!errors.cod_postal} helperText={errors.cod_postal?.message} label='Codigo postal' variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <TextField defaultValue={Cookie.get('direccion') ? JSON.parse(Cookie.get('direccion')!).pais : countries[0].name} select {...register('country',{
                            required:'Este campo es obligatorio'
                        })} error={!!errors.country} helperText={errors.country?.message}  variant="filled" label="Pais">
                            {
                                countries.map(country=>{
                                    return <MenuItem key={country.code} value={country.name}>{country.name}</MenuItem>
                                })
                            }
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...register('ciudad',{
                        required:'Este campo es obligatorio'
                    })} error={!!errors.ciudad} helperText={errors.ciudad?.message} label='Ciudad' variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...register('telefono',{
                        required:'Este campo es obligatorio'
                    })} error={!!errors.telefono} helperText={errors.telefono?.message} label='Telefono' variant="filled" fullWidth/>
                </Grid>
            </Grid>
        </form>

        <Box sx={{mt:5}} display='flex' justifyContent='center'>
            <Button type="submit" form='form3' color='secondary' className='circular-btn' size='large'>Revisar pedido</Button>
        </Box>

    </ShopLayout>
  )
}

//Esta era la unica forma de realizar la validacion de rutas en next 11 y anteriores
// export const getServerSideProps: GetServerSideProps = async ({req}) => {
    
//     const {token=''}=req.cookies;

//     let UserId='';
//     let isValidaToken=false;

//     try{

//         UserId=await isValidToken(token);
//         isValidaToken=true;

//     }catch(error){
//         console.log(error);
//     }

//     if(!isValidToken){
//         return {
//             redirect:{
//                 destination:`/auth/login?p=/checkout/address`,
//                 permanent:false
//             }
//         }
//     }

//     return {
//         props: {
            
//         }
//     }
// }

export default AddressPage;