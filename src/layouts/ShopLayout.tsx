import { NavBar } from "@/components/UI/NavBar"
import { SideMenu } from "@/components/UI/SideMenu"
import Head from "next/head"
import { FC } from "react"

interface props{
    children:JSX.Element | JSX.Element[],
    title?:string,
    pageDescription:string,
    imageFullUrl?:string
}

export const ShopLayout:FC<props> = ({children,title='Teslo Shop',pageDescription,imageFullUrl}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={pageDescription}/>
            <meta name="og:title" content={title}/>
            {
                imageFullUrl ? <meta name="og:image" content={imageFullUrl}/> : ''
            }
        </Head>

        <nav>
            <NavBar/>            
        </nav>

        <SideMenu/>

        <main style={{margin:'80px auto',maxWidth:'1440px',padding:'0px 30px'}}>
            {children}
        </main>
        <footer>

        </footer>
    </>
  )
}
