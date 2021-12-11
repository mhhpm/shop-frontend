import Link from 'next/link'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm header">
      <Container fluid>
        <Navbar.Brand>Book Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link href="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link href="/products">Books</Link>
            </Nav.Link>
            <Nav.Link>About</Nav.Link>
          </Nav>
          <div className="d-flex">
            <Button variant="outline-dark">
              <i className="bi-cart-fill me-1"></i>
              Cart
              <Badge pill bg="dark" text="white" className="ms-1">
                0
              </Badge>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
