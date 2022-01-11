import { HeaderData } from '@utils/data/header-data'
import useCartContext from '@utils/hooks/useCartContext'
import { getAvatarUrl } from '@utils/libs/helpers'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Badge, Button, Container, Image, Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import Options from './options'
import { OptionItem } from './options/style'

export const HeaderStyle = styled(Navbar)`
  padding-left: 24px;
  padding-right: 24px;

  .brand {
    background: linear-gradient(to right, #000005 0%, #7a7a93 100%);
    font-size: 28px;
    font-weight: bolder;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .nav-item {
    padding: 4px 16px;

    &:hover {
      color: var(--main-color);
      opacity: 0.85;
    }

    &.active {
      color: var(--main-color);
      font-weight: bold;
      border-bottom: solid 4px var(--main-color);
    }
  }

  @media screen and (max-width: 425px) {
    padding: 0 12px;
  }
`

const Header = () => {
  const { data: session } = useSession()
  const { pathname, push } = useRouter()
  const {
    cart: { cartItems },
  } = useCartContext()
  const splitPath = useMemo(() => pathname.split('/'), [pathname])

  const countItems = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0)

  console.log('cart', cartItems)
  return (
    <HeaderStyle
      bg="light"
      expand="md"
      sticky="top"
      className="shadow-sm header"
    >
      <Container fluid className="px-0">
        <Navbar.Brand className="brand me-5">
          <Link href="/">Book Shop</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {HeaderData.map(({ label, link }) => (
              <Link href={link} key={link}>
                <a
                  className={`nav-item text-center ${
                    link === `/${splitPath[1]}` ? 'active' : ''
                  }`}
                >
                  {label}
                </a>
              </Link>
            ))}
          </Nav>
          <div className="d-flex justify-content-center m-0 gap-2">
            <Button variant="outline-dark" onClick={() => push('/cart')}>
              <i className="bi-cart-fill me-1"></i>
              Cart
              <Badge pill bg="dark" text="white" className="ms-1">
                {countItems()}
              </Badge>
            </Button>
            {session ? (
              <>
                <Options
                  icon={
                    <Image
                      src={getAvatarUrl(`${session.user?.name}`)}
                      width={32}
                      className="opt-image"
                    />
                  }
                  className="position-relative user mx-2"
                >
                  <Link href={`/profile`}>
                    <OptionItem>
                      <i className="bi bi-person-lines-fill fs-5 me-3" /> Hồ sơ
                      của tôi
                    </OptionItem>
                  </Link>
                  {/* <hr className="border mb-1 border-secondary" /> */}
                  <OptionItem onClick={() => signOut()}>
                    <i className="bi bi-box-arrow-right fs-5 me-3" /> Đăng xuất
                  </OptionItem>
                </Options>
              </>
            ) : (
              <Button variant="dark" onClick={() => push('/auth/login')}>
                Đăng nhập
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </HeaderStyle>
  )
}

export default Header
