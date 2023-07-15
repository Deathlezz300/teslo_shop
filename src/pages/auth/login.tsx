import { AuthLayout } from "@/layouts/AuthLayout";
import {Box,Link,Button,Grid, TextField, Typography} from '@mui/material'
import NextLink from "next/link";

 const login = () => {
  return (
    <AuthLayout title="Login">
        <Box sx={{width:350,padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" component='h1'>Iniciar sesion</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Correo" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Contraseña" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Button color="secondary" className="circular-btn" size="large" fullWidth>Ingresar</Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <Link href="/auth/register" underline="always" component={NextLink} >¿No tienes cuenta?</Link>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default login;
