import { HeaderData } from '@utils/data/header-data'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

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
  const splitPath = useMemo(() => pathname.split('/'), [pathname])
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
            <Button variant="outline-dark">
              <i className="bi-cart-fill me-1"></i>
              Cart
              <Badge pill bg="dark" text="white" className="ms-1">
                0
              </Badge>
            </Button>
            {session ? (
              <button onClick={() => signOut()}>Log Out</button>
            ) : (
              <button onClick={() => push('/auth/login')}>Log In</button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </HeaderStyle>
  )
}

export default Header
