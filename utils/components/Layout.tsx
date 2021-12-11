import Head from 'next/head'
import { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {
  title: string
  children: ReactNode
} & (
  | { requireLogin: true; header?: boolean; footer?: boolean }
  | { requireLogin?: false; header: false; footer: false }
)

function Layout({ children, title, requireLogin, header, footer }: Props) {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
      </Head>
      {!requireLogin && <>{header && <Header key="header" />}</>}
      <main>{children}</main>
      {!requireLogin && <>{footer && <Footer key="footer" />}</>}
    </div>
  )
}

Layout.defaultProps = {
  header: true,
  footer: true,
}

export default Layout
