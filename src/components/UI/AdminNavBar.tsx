import {AppBar,Link,Toolbar,Badge,Typography,Box,Button,IconButton, Input, InputAdornment} from '@mui/material'
import {ClearOutlined, SearchOutlined,ShoppingCartOutlined} from '@mui/icons-material'
import  NextLink from 'next/link'
import { useRouter } from 'next/router'
import {useContext} from 'react'
import { UIContexto } from '@/Context/UIContext'
import { useForm } from '@/Hooks/useForm'
import { CartContext } from '@/Context/CartContext'

const initalState={
    input:''
}

export const AdminNavBar = () => {


  const {asPath,push}=useRouter();

  const {input,onInputChange}=useForm(initalState);

  const {ChangeMenu,ShowSearch,ChangeSearch}=useContext(UIContexto);

  const {productos}=useContext(CartContext)
  
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
        

            <Button onClick={ChangeMenu}>Menú</Button>

        </Toolbar>
    </AppBar>
  )
}