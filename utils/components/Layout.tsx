import Head from 'next/head'
import { ReactNode } from 'react'
import Header from './Header'

type Props = {
  title: string
  children: ReactNode
} & (
  | { requireLogin: true; header?: boolean }
  | { requireLogin?: false; header: false }
)

function Layout({ children, title, requireLogin, header }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {!requireLogin && <>{header && <Header key="header" />}</>}
      <main>{children}</main>
    </>
  )
}

Layout.defaultProps = {
  header: true,
}

export default Layout
