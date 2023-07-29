import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {ThemeProvider,CssBaseline} from '@mui/material'
import { lightTheme } from '@/themes/light-theme'
import {SWRConfig} from 'swr'
import { UIProvider } from '@/Context/UIProvider'
import { CartProvider } from '@/Context/CartProvider'
import { AuthProvider } from '@/Context/AuthProvider'
import {SessionProvider} from 'next-auth/react'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
          <PayPalScriptProvider options={{clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT || ''}}>
              <AuthProvider>
              <CartProvider>
                <UIProvider>
                  <SWRConfig
                  value={{
                    fetcher:(...args:[key:string])=>fetch(...args).then(res=>res.json())
                  }}>
                    <ThemeProvider theme={lightTheme}>
                      <CssBaseline/>
                      <Component {...pageProps} />
                  </ThemeProvider>
                </SWRConfig>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </PayPalScriptProvider>
    </SessionProvider>
  )
}
