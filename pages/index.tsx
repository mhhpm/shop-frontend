import Banner from '@components/home/Banner'
import Product from '@components/products/Product'
import Layout from '@utils/components/Layout'
import { Col, Container, Row } from 'react-bootstrap'
const ImgSrc = 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'

export default function Home() {
  return (
    <Layout title="Book Shop | Home">
      <Banner />
      <section className="py-5">
        <Container className="px-4 px-lg-5 mt-5">
          <Row className="gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <Col className="mb-5">
              <Product
                name="Special Item"
                id="1"
                image={ImgSrc}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}
