import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {ThemeProvider,CssBaseline} from '@mui/material'
import { lightTheme } from '@/themes/light-theme'
import {SWRConfig} from 'swr'
import { UIProvider } from '@/Context/UIProvider'
import { CartProvider } from '@/Context/CartProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  )
}
