import {Box,CircularProgress,Typography} from '@mui/material'

export const Loader = () => {
  return (
    <Box
        display='flex' justifyContent='center' alignItems='center'
         height='calc(100vh - 200px)' flexDirection='column'>
            <CircularProgress thickness={3} />
            <Typography fontSize={20} sx={{mt:1}}>Cargando...</Typography>
    </Box>
  )
}
