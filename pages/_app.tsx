import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { AppProvider } from 'store'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <AppProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <Toaster />
        </SessionProvider>
      </AppProvider>
    </>
  )
}

export default MyApp
