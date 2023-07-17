import {AppBar,Link,Toolbar,Badge,Typography,Box,Button,IconButton} from '@mui/material'
import {SearchOutlined,ShoppingCartOutlined} from '@mui/icons-material'
import  NextLink from 'next/link'
import { useRouter } from 'next/router'
import {useContext} from 'react'
import { UIContexto } from '@/Context/UIContext'

export const NavBar = () => {

  const {asPath}=useRouter();

  const {ChangeMenu}=useContext(UIContexto);

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
                        <Button color={asPath==='/category/men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                    <Link href='/category/women'  underline='none' component={NextLink}>
                        <Button color={asPath==='/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                    <Link href='/category/kid'  underline='none' component={NextLink}>
                        <Button color={asPath==='/category/kid' ? 'primary' : 'info'}>Niños</Button>
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

            <Button onClick={ChangeMenu}>Menú</Button>

        </Toolbar>
    </AppBar>
  )
}
