import Head from 'next/head'
import React,{FC} from 'react'
import {Box} from '@mui/material'

interface props{
    title:string,
    children:JSX.Element | JSX.Element[]
}

export const AuthLayout:FC<props> = ({title,children}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
        </Head>
        <main>
            <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh)'>
                {children}
            </Box>
        </main>
    </>
  )
}
