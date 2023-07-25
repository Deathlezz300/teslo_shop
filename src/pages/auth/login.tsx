import { AuthContext } from "@/Context/AuthContext";
import { AuthLayout } from "@/layouts/AuthLayout";
import { isEmail } from "@/utils/validation";
import { ErrorOutline } from "@mui/icons-material";
import {Box,Link,Button,Grid, TextField, Typography, Chip, Divider} from '@mui/material'
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import {useForm} from 'react-hook-form'
import { useRouter } from "next/router";
import {signIn,getSession,getProviders} from 'next-auth/react'
import { GetServerSideProps } from 'next'

type FormData={
    email:string,
    password:string
}


 const LoginPage = () => {

    const router=useRouter();

    const {handleSubmit,register,formState:{errors}}=useForm<FormData>();

    const {errors:errores,status}=useContext(AuthContext);

    const [providers,SetProviders]=useState<any>({});

    useEffect(()=>{
        getProviders().then(prov=>{
            SetProviders(prov);
        })
    },[])

    const getPath=()=>{
        return router.query.p?.toString() || '/';
    }

    const onLoginUser=async({email,password}:FormData)=>{
        // const isValid=await startLogin(email,password);

        // if(isValid){
        //     const ruta=getPath();
        //     router.replace(ruta);
        // }

        await signIn('credentials',{email,password})

    }


  return (
    <AuthLayout title="Login">
        <form id="form1" onSubmit={handleSubmit(onLoginUser)}>
            <Box sx={{width:350,padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component='h1'>Iniciar sesion</Typography>
                        {
                            errores ? <Chip label={errores as string} color="error" className="fadeIn" icon={<ErrorOutline/>}/> : ''
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register('email',{
                            required:'Este campo es requerido',
                            validate:isEmail
                        })} error={!!errors.email} helperText={errors.email?.message} label="Correo" variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="password" {...register('password',{
                            required:'Este campo es obligatorio',
                            minLength:{value:6,message:'Minimo 6 caracteres'}
                        })} error={!!errors.password} helperText={errors.password?.message} label="Contraseña" variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={status==='loading' ? true : false} type="submit" form='form1' color="secondary" className="circular-btn" size="large" fullWidth>Ingresar</Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <Link href={`/auth/register?p=${getPath()}`} underline="always" component={NextLink} >¿No tienes cuenta?</Link>
                    </Grid>
                    <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                        <Divider sx={{width:'100%',mb:2}}/>
                        {

                            Object.values(providers).map((provider:any)=>{

                                if(provider.id==='credentials') return (<div key='credentials'></div>)


                                return (
                                    <Button onClick={()=>signIn(provider.id)} key={provider.id} variant="outlined"
                                        color="primary"  sx={{mb:1}} fullWidth>
                                        {provider.name}
                                    </Button>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
    
    const session=await getSession({req});

    const {p='/'}=query;

    if(session){
        return {
            redirect:{
                destination:p.toString(),
                permanent:false
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default LoginPage;
