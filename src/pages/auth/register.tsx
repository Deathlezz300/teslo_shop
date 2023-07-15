import { AuthLayout } from "@/layouts/AuthLayout";
import {Box,Link,Button,Grid, TextField, Typography} from '@mui/material'
import NextLink from "next/link";

 const registerPage = () => {
  return (
    <AuthLayout title="Login">
        <Box sx={{width:350,padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" component='h1'>Crear cuenta</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Nombre completo" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Correo" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Contraseña" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Button color="secondary" className="circular-btn" size="large" fullWidth>Crear cuenta</Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <Link href="/auth/login" underline="always" component={NextLink} >Ya tienes cuenta?</Link>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default registerPage;