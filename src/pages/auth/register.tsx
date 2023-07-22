import { AuthContext } from "@/Context/AuthContext";
import { AuthLayout } from "@/layouts/AuthLayout";
import { isEmail } from "@/utils/validation";
import { ErrorOutline } from "@mui/icons-material";
import {Box,Link,Button,Grid, TextField, Typography,Chip} from '@mui/material'
import NextLink from "next/link";
import { useContext } from "react";
import {useForm} from 'react-hook-form';

interface formData{
    email:string,
    password:string,
    name:string
}

 const RegisterPage = () => {
 
  const {register,handleSubmit,formState:{errors}}=useForm<formData>();

  const {errors:errores,status,startRegister}=useContext(AuthContext);

  const onStartRegister=({email,name,password}:formData)=>{
    startRegister(email,password,name)
  }

  return (
    <AuthLayout title="Registro">
        <form onSubmit={handleSubmit(onStartRegister)} id="form2">
            <Box sx={{width:350,padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography  variant="h1" component='h1'>Crear cuenta</Typography>
                        {
                            errores ? <Chip label={errores as string} color="error" className="fadeIn" icon={<ErrorOutline/>}/> : ''
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register('name',{
                            required:'El nombre es obligatorio',
                            minLength:{value:6,message:'El nombre debe ser mayor a 6 caracteres'}
                        })} label="Nombre completo" error={!!errors.name} helperText={errors.name?.message} variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register('email',{
                            required:'El correo es obligatorio',
                            validate:isEmail
                        })} label="Correo" error={!!errors.email} helperText={errors.email?.message} variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register('password',{
                            required:'La contraseña es obligatoria',
                            minLength:{value:6,message:'La contraseña debe ser mayor a 6 caracteres'}
                        })} label="Contraseña" error={!!errors.password} helperText={errors.password?.message} variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={status==='loading' ? true :false} type="submit" form='form2' color="secondary" className="circular-btn" size="large" fullWidth>Crear cuenta</Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <Link href="/auth/login" underline="always" component={NextLink} >Ya tienes cuenta?</Link>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage;