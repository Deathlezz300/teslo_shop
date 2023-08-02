import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import {useContext} from 'react'
import { UIContexto } from "@/Context/UIContext"
import { useRouter } from "next/router"
import { useForm } from "@/Hooks/useForm"
import { AuthContext } from "@/Context/AuthContext"

const initalState={
    input:''
}

export const SideMenu = () => {

  const router=useRouter();

  const {input,onInputChange}=useForm(initalState);

  const {ShowMenu,ChangeMenu}=useContext(UIContexto);

  const {status,user,startLogOut}=useContext(AuthContext);

  const onSearchTerm=()=>{
    if(input.trim().length===0) return ;

    navigateTo(`/search/${input}`)

  }

  const navigateTo=(url:string)=>{
    ChangeMenu();
    router.push(url);
  }


  return (
    <Drawer
        open={ ShowMenu }
        onClose={ChangeMenu}
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        type='text'
                        autoFocus
                        placeholder="Buscar..."
                        name="input"
                        onChange={onInputChange}
                        onKeyUp={(e)=>e.key==='Enter' ? onSearchTerm() : ''}
                        value={input}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={onSearchTerm}
                                aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {
                    status==='authenticated' ? 
                    <>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>

                        <ListItem button onClick={()=>navigateTo('/orders/history')}>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Mis Ordenes'} />
                        </ListItem>
                    </> : ''
                }


                <ListItem onClick={()=>navigateTo('/category/men')} button sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem onClick={()=>navigateTo('/category/women')} button sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem onClick={()=>navigateTo('/category/kid')} button sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>


                {
                    status!='authenticated' ? 
                    <ListItem onClick={()=>navigateTo(`/auth/login?p=${router.asPath}`)} button>
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem> 
                     : 
                    <ListItem onClick={startLogOut} button>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItem>
                }



                {
                    user?.role==='admin' ? 
                    <>
                    <Divider />
                    <ListSubheader>Admin Panel</ListSubheader>
                    <ListItem button onClick={()=>navigateTo('/admin/')}>
                        <ListItemIcon>
                            <DashboardOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    <ListItem button onClick={()=>navigateTo('/admin/products')}>
                        <ListItemIcon>
                            <CategoryOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Productos'} />
                    </ListItem>
                    <ListItem button onClick={()=>navigateTo('/admin/orders')}>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ordenes'} />
                    </ListItem>

                    <ListItem button onClick={()=>navigateTo('/admin/users')}>
                        <ListItemIcon>
                            <AdminPanelSettings/>
                        </ListItemIcon>
                        <ListItemText primary={'Usuarios'} />
                    </ListItem>
                    </> : ''
                }
            </List>
        </Box>
    </Drawer>
  )
}
