import 'bootstrap/dist/css/bootstrap.css'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
