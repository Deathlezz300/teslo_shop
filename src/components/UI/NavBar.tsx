import {AppBar,Link,Toolbar,Badge,Typography,Box,Button,IconButton, Input, InputAdornment} from '@mui/material'
import {ClearOutlined, SearchOutlined,ShoppingCartOutlined} from '@mui/icons-material'
import  NextLink from 'next/link'
import { useRouter } from 'next/router'
import {useContext} from 'react'
import { UIContexto } from '@/Context/UIContext'
import { useForm } from '@/Hooks/useForm'

const initalState={
    input:''
}

export const NavBar = () => {


  const {asPath,push}=useRouter();

  const {input,onInputChange}=useForm(initalState);

  const {ChangeMenu,ShowSearch,ChangeSearch}=useContext(UIContexto);

  
  const onSearchTerm=()=>{
    if(input.trim().length===0) return ;
    ChangeSearch();
    navigateTo(`/search/${input}`)

  }

  const navigateTo=(url:string)=>{
    push(url);
  }

  return (
    <AppBar>
        <Toolbar>
            <Link display='flex' alignItems='center' href='/' underline='none' component={NextLink}>
                <Typography variant='h6'>Teslo |</Typography>
                <Typography sx={{ml:0.5}}>Shop</Typography>
            </Link>

            <Box flex={1}/>
        
                <Box  sx={{display:ShowSearch ? 'none' : {xs:'none',sm:'block'}}} className='fadeIn'>
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

            {
                ShowSearch ? 
                <Input
                        className='fadeIn'
                        type='text'
                        autoFocus
                        sx={{display:{xs:'none',sm:'flex'}}}
                        placeholder="Buscar..."
                        name="input"
                        onChange={onInputChange}
                        onKeyUp={(e)=>e.key==='Enter' ? onSearchTerm() : ''}
                        value={input}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={ChangeSearch}
                                aria-label="toggle password visibility"
                                >
                                 <ClearOutlined/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    :
                    <IconButton className='fadeIn' onClick={ChangeSearch} sx={{display:{xs:'none',sm:'flex'}}}>
                        <SearchOutlined/>
                    </IconButton>
            }


            <IconButton onClick={ChangeMenu} sx={{display:{xs:'flex',sm:'none'}}}>
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
