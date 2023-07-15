import {AppBar,Link,Toolbar,Badge,Typography,Box,Button,IconButton} from '@mui/material'
import {SearchOutlined,ShoppingCartOutlined} from '@mui/icons-material'
import  NextLink from 'next/link'

export const NavBar = () => {
  return (
    <AppBar>
        <Toolbar>
            <Link display='flex' alignItems='center' href='/' underline='none' component={NextLink}>
                <Typography variant='h6'>Teslo |</Typography>
                <Typography sx={{ml:0.5}}>Shop</Typography>
            </Link>

            <Box flex={1}/>
        
                <Box sx={{display:{xs:'none',sm:'block'}}}>
                    <Link href='/category/men' underline='none' component={NextLink}>
                        <Button>Hombres</Button>
                    </Link>
                    <Link href='/category/women' underline='none' component={NextLink}>
                        <Button>Mujeres</Button>
                    </Link>
                    <Link href='/category/kid' underline='none' component={NextLink}>
                        <Button>Niños</Button>
                    </Link>
                </Box>


            <Box flex={1}/>

            <IconButton>
                <SearchOutlined/>
            </IconButton>

            <Link underline='none' component={NextLink} href='/cart'>
                <IconButton>
                    <Badge badgeContent={2} color='secondary'>
                        <ShoppingCartOutlined/>
                    </Badge>
                </IconButton>
            </Link>

            <Button>Menú</Button>

        </Toolbar>
    </AppBar>
  )
}
