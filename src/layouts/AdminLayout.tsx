import { AdminNavBar } from "@/components/UI/AdminNavBar"
import { SideMenu } from "@/components/UI/SideMenu"
import { Box, Typography } from "@mui/material"
import { FC } from "react"

interface props{
    children:JSX.Element | JSX.Element[],
    title?:string,
    subtitle:string,
    icon:JSX.Element
}

export const AdminLayout:FC<props> = ({children,title='Teslo Shop',subtitle,icon}) => {
  return (
    <>

        <nav>
            <AdminNavBar/>            
        </nav>

        <SideMenu/>

        <main style={{margin:'80px auto',maxWidth:'1440px',padding:'0px 30px'}}>
            <Box display='flex' flexDirection='column'>
                <Typography variant="h1" component='h1'>
                    {title}
                    {icon}
                </Typography>
                <Typography variant="h2" sx={{mb:1}}>
                    {subtitle}
                </Typography>
            </Box>
            <Box className='fadeIn'>
                {children}
            </Box>
        </main>
    </>
  )
}