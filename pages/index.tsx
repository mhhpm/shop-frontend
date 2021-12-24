import Banner from '@components/home/Banner'
import Product from '@components/products/Product'
import Layout from '@utils/components/Layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Col, Container, Row } from 'react-bootstrap'
const ImgSrc = 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'

export default function Home() {
  return (
    <Layout title="Book Shop | Trang chủ">
      <Banner />
      <section className="pb-5">
        <Container className="px-4 px-lg-5 mt-5">
          <Row className="g-sm-5 g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrc}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrc}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrc}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
            <Col>
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  console.log('Session', session?.accessToken)
  return {
    props: {},
  }
}
