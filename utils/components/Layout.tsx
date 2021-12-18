import dynamic from 'next/dynamic'
import Head from 'next/head'
import { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

const RequireLogin = dynamic(() => import('./RequireLogin'), { ssr: false })

type Props = {
  title: string
  children: ReactNode
} & {
  requireLogin?: boolean
  header?: boolean
  footer?: boolean
}

function Layout({ children, title, requireLogin, header, footer }: Props) {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
      </Head>
      {requireLogin && <RequireLogin />}
      {header && <Header key="header" />}
      <main>{children}</main>
      {footer && <Footer key="footer" />}
    </div>
  )
}

Layout.defaultProps = {
  header: true,
  footer: true,
}

export default Layout
